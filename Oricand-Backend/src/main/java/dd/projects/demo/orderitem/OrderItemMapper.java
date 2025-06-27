package dd.projects.demo.orderitem;

import dd.projects.demo.orderitem.dto.OrderItemResponseDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderItemMapper {
    OrderItemResponseDto toResponseDto(OrderItem item);
}