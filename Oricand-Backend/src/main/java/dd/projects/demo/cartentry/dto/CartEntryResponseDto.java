package dd.projects.demo.cartentry.dto;

import dd.projects.demo.product.dto.ProductSummaryDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartEntryResponseDto {
    private Long id;
    private Integer quantity;
    private BigDecimal pricePerPiece;
    private BigDecimal totalPriceEntry;

    private ProductSummaryDto product;
}
