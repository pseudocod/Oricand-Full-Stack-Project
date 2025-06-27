package dd.projects.demo.order;

import dd.projects.demo.address.Address;
import dd.projects.demo.order.dto.GuestOrderRequestDto;
import dd.projects.demo.order.dto.OrderAdminResponseDto;
import dd.projects.demo.order.dto.OrderResponseDto;
import dd.projects.demo.orderitem.OrderItemMapper;
import dd.projects.demo.paymenttype.PaymentType;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {OrderItemMapper.class})
public interface OrderMapper {

    @Mapping(target = "items", source = "items")
    OrderResponseDto toResponseDto(Order order);

    @Mapping(target = "items", source = "items")
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "userFirstName", source = "user.firstName")
    @Mapping(target = "userLastName", source = "user.lastName")
    @Mapping(target = "userEmail", source = "user.email")
    @Mapping(target = "deliveryAddress", expression = "java(formatAddress(order.getDeliveryAddress()))")
    @Mapping(target = "invoiceAddress", expression = "java(formatAddress(order.getInvoiceAddress()))")
    OrderAdminResponseDto toAdminResponseDto(Order order);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "guestEmail", source = "dto.email")
    @Mapping(target = "guestFirstName", source = "dto.firstName")
    @Mapping(target = "guestLastName", source = "dto.lastName")
    @Mapping(target = "guestPhone", source = "dto.phoneNumber")
    @Mapping(target = "isGuestOrder", constant = "true")
    @Mapping(target = "paymentType", source = "dto.paymentType")
    @Mapping(target = "deliveryAddress", source = "deliveryAddress")
    @Mapping(target = "invoiceAddress", source = "invoiceAddress")
    @Mapping(target = "status", constant = "PENDING")
    @Mapping(target = "orderDate", ignore = true)
    @Mapping(target = "totalPrice", ignore = true)
    @Mapping(target = "items", ignore = true)
    Order toGuestOrder(GuestOrderRequestDto dto, Address deliveryAddress, Address invoiceAddress);

    default String formatAddress(dd.projects.demo.address.Address address) {
        if (address == null) return null;
        return String.format("%s, %s, %s %s, %s",
                address.getStreetLine(),
                address.getCity(),
                address.getPostalCode(),
                address.getCounty(),
                address.getCountry());
    }
}
