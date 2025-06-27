package dd.projects.demo.order.dto;

import dd.projects.demo.order.OrderStatus;
import lombok.Data;

@Data
public class OrderStatusUpdateRequestDto {
    private OrderStatus status;
}
