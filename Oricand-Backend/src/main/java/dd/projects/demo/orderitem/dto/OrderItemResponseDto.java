package dd.projects.demo.orderitem.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemResponseDto {
    private String productName;
    private BigDecimal pricePerPiece;
    private Integer quantity;
    private BigDecimal totalPrice;
}

