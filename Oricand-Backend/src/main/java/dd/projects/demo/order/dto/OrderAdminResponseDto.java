package dd.projects.demo.order.dto;

import dd.projects.demo.order.OrderStatus;
import dd.projects.demo.orderitem.dto.OrderItemResponseDto;
import dd.projects.demo.paymenttype.PaymentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderAdminResponseDto {
    private Long id;
    private PaymentType paymentType;
    private BigDecimal totalPrice;
    private LocalDate orderDate;
    private OrderStatus status;
    private List<OrderItemResponseDto> items;
    
    private Long userId;
    private String userFirstName;
    private String userLastName;
    private String userEmail;
    
    private String deliveryAddress;
    private String invoiceAddress;
} 