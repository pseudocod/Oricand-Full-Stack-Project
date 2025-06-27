package dd.projects.demo.order;

import dd.projects.demo.address.Address;
import dd.projects.demo.address.AddressRepository;
import dd.projects.demo.address.dto.AddressRequestDto;
import dd.projects.demo.address.exception.AddressNotFoundException;
import dd.projects.demo.address.exception.MissingAddressInformationException;
import dd.projects.demo.cart.Cart;
import dd.projects.demo.cart.CartRepository;
import dd.projects.demo.cart.exceptions.CartNotFoundException;
import dd.projects.demo.cart.exceptions.EmptyCartException;
import dd.projects.demo.email.EmailService;
import dd.projects.demo.loyalty.LoyaltyCardService;
import dd.projects.demo.order.dto.GuestOrderRequestDto;
import dd.projects.demo.order.dto.OrderAdminResponseDto;
import dd.projects.demo.order.dto.OrderCreateRequestDto;
import dd.projects.demo.order.dto.OrderResponseDto;
import dd.projects.demo.orderitem.OrderItem;
import dd.projects.demo.paymenttype.PaymentType;
import dd.projects.demo.product.Product;
import dd.projects.demo.product.ProductRepository;
import dd.projects.demo.security.CurrentUserProvider;
import dd.projects.demo.user.User;
import dd.projects.demo.user.UserRepository;
import dd.projects.demo.user.exception.UserNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    private static final int POINTS_PER_UNIT = 10;
    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderMapper orderMapper;
    private final CurrentUserProvider currentUserProvider;
    private final EmailService emailService;
    private final LoyaltyCardService loyaltyCardService;

    @Transactional
    public OrderResponseDto createOrder(OrderCreateRequestDto dto) {
        User user = getCurrentUser();
        Cart cart = getCartById(dto.getCartId());

        if (cart.getCartEntries().isEmpty()) {
            throw new EmptyCartException("Cannot place order from an empty cart.");
        }

        Address deliveryAddress = resolveAddress(user, dto.getDeliveryAddressId(), dto.getDeliveryAddress());
        Address invoiceAddress;
        if (Boolean.TRUE.equals(dto.getUseSameInvoiceAddress())) {
            invoiceAddress = deliveryAddress;
        } else {
            invoiceAddress = resolveAddress(user, dto.getInvoiceAddressId(), dto.getInvoiceAddress());
        }

        Order order = Order.builder()
                .user(user)
                .paymentType(dto.getPaymentType() != null ? dto.getPaymentType() : PaymentType.CASH)
                .deliveryAddress(deliveryAddress)
                .invoiceAddress(invoiceAddress)
                .status(OrderStatus.PENDING)
                .build();

        BigDecimal totalPrice = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();

        for (var entry : cart.getCartEntries()) {
            Product product = entry.getProduct();

            if (product.getAvailableQuantity() < entry.getQuantity()) {
                throw new NotEnoughStockException(product.getName(), product.getAvailableQuantity());
            }

            product.setAvailableQuantity(product.getAvailableQuantity() - entry.getQuantity());

            BigDecimal itemTotal = entry.getPricePerPiece().multiply(BigDecimal.valueOf(entry.getQuantity()));
            totalPrice = totalPrice.add(itemTotal);

            OrderItem item = OrderItem.builder()
                    .order(order)
                    .productName(product.getName())
                    .pricePerPiece(entry.getPricePerPiece())
                    .quantity(entry.getQuantity())
                    .totalPrice(itemTotal)
                    .build();

            orderItems.add(item);
        }

        BigDecimal subtotal = totalPrice;
        int discountPercentage = loyaltyCardService.getDiscountPercentage(user.getId());
        BigDecimal discountAmount = BigDecimal.ZERO;

        if (discountPercentage > 0) {
            discountAmount = subtotal.multiply(BigDecimal.valueOf(discountPercentage))
                    .divide(BigDecimal.valueOf(100), 2, java.math.RoundingMode.HALF_UP);
            totalPrice = subtotal.subtract(discountAmount);
        }

        order.setItems(orderItems);
        order.setTotalPrice(totalPrice);

        Order savedOrder = orderRepository.save(order);

        cart.getCartEntries().clear();
        cartRepository.save(cart);

        int pointsToAdd = calculatePoints(totalPrice);
        loyaltyCardService.addPoints(user.getId(), pointsToAdd);
        log.info("Added {} loyalty points to user {} for order {} (applied {}% discount: ${})",
                pointsToAdd, user.getId(), savedOrder.getId(), discountPercentage, discountAmount);

        try {
            emailService.sendOrderConfirmationEmail(savedOrder);
        } catch (Exception e) {
            log.error("Failed to send order confirmation email for order: {}", savedOrder.getId(), e);
        }

        return orderMapper.toResponseDto(savedOrder);
    }

    private int calculatePoints(BigDecimal totalPrice) {
        return totalPrice.intValue() * POINTS_PER_UNIT;
    }

    @Transactional
    public List<OrderResponseDto> getOrderHistoryForCurrentUser(OrderStatus statusFilter) {
        Long userId = currentUserProvider.getCurrentUserId();

        List<Order> orders = (statusFilter != null)
                ? orderRepository.findAllByUserIdAndStatusOrderByOrderDateDesc(userId, statusFilter)
                : orderRepository.findAllByUserIdOrderByOrderDateDesc(userId);

        return orders.stream()
                .map(orderMapper::toResponseDto)
                .toList();
    }

    @Transactional
    public void updateOrderStatus(Long orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));

        order.setStatus(newStatus);
        orderRepository.save(order);
    }

    @Transactional
    public OrderResponseDto cancelOrder(Long orderId) {
        Long currentUserId = currentUserProvider.getCurrentUserId();

        Order order = orderRepository.findByIdAndUserId(orderId, currentUserId)
                .orElseThrow(() -> OrderCancellationException.forUnauthorizedAccess(orderId));

        if (order.getStatus() != OrderStatus.PENDING) {
            throw OrderCancellationException.forInvalidStatus(order.getStatus());
        }

        restoreStockForCancelledOrder(order);

        order.setStatus(OrderStatus.CANCELLED);
        Order savedOrder = orderRepository.save(order);

        return orderMapper.toResponseDto(savedOrder);
    }

    private void restoreStockForCancelledOrder(Order order) {
        for (OrderItem item : order.getItems()) {
            Product product = productRepository.findByName(item.getProductName())
                    .orElse(null);

            if (product != null) {
                product.setAvailableQuantity(product.getAvailableQuantity() + item.getQuantity());
                productRepository.save(product);
            }
        }
    }

    private Address resolveAddress(User user, Long addressId, AddressRequestDto dto) {
        if (addressId != null) {
            return addressRepository.findById(addressId)
                    .orElseThrow(() -> new AddressNotFoundException(addressId));
        }

        if (dto != null) {
            Address newAddress = Address.builder()
                    .user(user)
                    .streetLine(dto.getStreetLine())
                    .postalCode(dto.getPostalCode())
                    .city(dto.getCity())
                    .county(dto.getCounty())
                    .country(dto.getCountry())
                    .build();
            return addressRepository.save(newAddress);
        }

        throw new MissingAddressInformationException();
    }

    private User getCurrentUser() {
        Long userId = currentUserProvider.getCurrentUserId();
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    private Cart getCartById(Long cartId) {
        return cartRepository.findById(cartId)
                .orElseThrow(() -> new CartNotFoundException(cartId));
    }

    @Transactional
    public List<OrderAdminResponseDto> getAllOrdersForAdmin(OrderStatus statusFilter) {
        List<Order> orders = (statusFilter != null)
                ? orderRepository.findAllByStatusOrderByOrderDateDesc(statusFilter)
                : orderRepository.findAllByOrderByOrderDateDesc();

        return orders.stream()
                .map(orderMapper::toAdminResponseDto)
                .toList();
    }

    @Transactional
    public OrderAdminResponseDto getOrderByIdForAdmin(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));

        return orderMapper.toAdminResponseDto(order);
    }

    @Transactional
    public OrderAdminResponseDto updateOrderStatusForAdmin(Long orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));

        validateStatusTransition(order.getStatus(), newStatus);

        order.setStatus(newStatus);
        Order savedOrder = orderRepository.save(order);

        return orderMapper.toAdminResponseDto(savedOrder);
    }

    private void validateStatusTransition(OrderStatus currentStatus, OrderStatus newStatus) {
        if (currentStatus == OrderStatus.DELIVERED && newStatus == OrderStatus.PENDING) {
            throw InvalidOrderStatusTransitionException.fromDeliveredToPending();
        }

        if (currentStatus == OrderStatus.CANCELLED && newStatus != OrderStatus.CANCELLED) {
            throw InvalidOrderStatusTransitionException.fromCancelledToOther(newStatus);
        }
    }

    @Transactional
    public OrderResponseDto createGuestOrder(GuestOrderRequestDto dto) {
        validateGuestOrderRequest(dto);

        Cart cart = getCartById(dto.getCartId());

        if (cart.getCartEntries().isEmpty()) {
            throw new EmptyCartException("Cannot place order from an empty cart.");
        }

        Address deliveryAddress = createGuestAddress(dto.getDeliveryAddress());
        Address invoiceAddress;
        if (Boolean.TRUE.equals(dto.getUseSameInvoiceAddress())) {
            invoiceAddress = deliveryAddress;
        } else {
            invoiceAddress = createGuestAddress(dto.getInvoiceAddress());
        }

        Order order = orderMapper.toGuestOrder(dto, deliveryAddress, invoiceAddress);

        order.setGuestEmail(dto.getEmail().trim().toLowerCase());
        order.setGuestFirstName(dto.getFirstName().trim());
        order.setGuestLastName(dto.getLastName().trim());
        if (order.getPaymentType() == null) {
            order.setPaymentType(PaymentType.CASH);
        }

        BigDecimal totalPrice = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();

        for (var entry : cart.getCartEntries()) {
            Product product = entry.getProduct();

            if (product.getAvailableQuantity() < entry.getQuantity()) {
                throw new NotEnoughStockException(product.getName(), product.getAvailableQuantity());
            }

            product.setAvailableQuantity(product.getAvailableQuantity() - entry.getQuantity());

            BigDecimal itemTotal = entry.getPricePerPiece().multiply(BigDecimal.valueOf(entry.getQuantity()));
            totalPrice = totalPrice.add(itemTotal);

            OrderItem item = OrderItem.builder()
                    .order(order)
                    .productName(product.getName())
                    .pricePerPiece(entry.getPricePerPiece())
                    .quantity(entry.getQuantity())
                    .totalPrice(itemTotal)
                    .build();

            orderItems.add(item);
        }

        order.setItems(orderItems);
        order.setTotalPrice(totalPrice);

        Order savedOrder = orderRepository.save(order);

        cart.getCartEntries().clear();
        cartRepository.save(cart);


        try {
            emailService.sendOrderConfirmationEmail(savedOrder);
        } catch (Exception e) {
            log.error("Failed to send order confirmation email for guest order: {}", savedOrder.getId(), e);
        }

        return orderMapper.toResponseDto(savedOrder);
    }

    private void validateGuestOrderRequest(GuestOrderRequestDto dto) {
        if (dto.getEmail() == null || dto.getEmail().trim().isEmpty()) {
            throw GuestOrderValidationException.missingEmail();
        }
        if (dto.getFirstName() == null || dto.getFirstName().trim().isEmpty()) {
            throw GuestOrderValidationException.missingFirstName();
        }
        if (dto.getLastName() == null || dto.getLastName().trim().isEmpty()) {
            throw GuestOrderValidationException.missingLastName();
        }

        String email = dto.getEmail().trim();
        if (!email.contains("@") || !email.contains(".")) {
            throw GuestOrderValidationException.invalidEmail(email);
        }
    }

    private Address createGuestAddress(AddressRequestDto dto) {
        if (dto == null) {
            throw new MissingAddressInformationException();
        }

        Address address = Address.builder()
                .user(null)
                .streetLine(dto.getStreetLine())
                .postalCode(dto.getPostalCode())
                .city(dto.getCity())
                .county(dto.getCounty())
                .country(dto.getCountry())
                .build();

        return addressRepository.save(address);
    }

    @Transactional
    public int claimGuestOrders(String email, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        List<Order> guestOrders = orderRepository.findAllByGuestEmailAndUserIsNullOrderByOrderDateDesc(email.toLowerCase());

        for (Order order : guestOrders) {
            order.setUser(user);
        }

        orderRepository.saveAll(guestOrders);

        return guestOrders.size();
    }
}
