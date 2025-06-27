package dd.projects.demo.order;

import dd.projects.demo.order.dto.OrderAdminResponseDto;
import dd.projects.demo.order.dto.OrderCreateRequestDto;
import dd.projects.demo.order.dto.OrderResponseDto;
import dd.projects.demo.order.dto.OrderStatusUpdateRequestDto;
import dd.projects.demo.order.dto.GuestOrderRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponseDto> createOrder(@RequestBody OrderCreateRequestDto dto) {
        OrderResponseDto response = orderService.createOrder(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/guest")
    public ResponseEntity<OrderResponseDto> createGuestOrder(@RequestBody GuestOrderRequestDto dto) {
        OrderResponseDto response = orderService.createGuestOrder(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/my")
    public List<OrderResponseDto> getMyOrders(@RequestParam(required = false) OrderStatus status) {
        return orderService.getOrderHistoryForCurrentUser(status);
    }

    @PatchMapping("/{orderId}/status")
    public ResponseEntity<Void> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestBody OrderStatusUpdateRequestDto requestDto) {
        orderService.updateOrderStatus(orderId, requestDto.getStatus());
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{orderId}/cancel")
    public ResponseEntity<OrderResponseDto> cancelOrder(@PathVariable Long orderId) {
        OrderResponseDto response = orderService.cancelOrder(orderId);
        return ResponseEntity.ok(response);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/all")
    public ResponseEntity<List<OrderAdminResponseDto>> getAllOrdersForAdmin(
            @RequestParam(required = false) OrderStatus status) {
        List<OrderAdminResponseDto> orders = orderService.getAllOrdersForAdmin(status);
        return ResponseEntity.ok(orders);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/{orderId}")
    public ResponseEntity<OrderAdminResponseDto> getOrderByIdForAdmin(@PathVariable Long orderId) {
        OrderAdminResponseDto order = orderService.getOrderByIdForAdmin(orderId);
        return ResponseEntity.ok(order);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/admin/{orderId}/status")
    public ResponseEntity<OrderAdminResponseDto> updateOrderStatusForAdmin(
            @PathVariable Long orderId,
            @RequestBody OrderStatusUpdateRequestDto requestDto) {
        OrderAdminResponseDto response = orderService.updateOrderStatusForAdmin(orderId, requestDto.getStatus());
        return ResponseEntity.ok(response);
    }
}
