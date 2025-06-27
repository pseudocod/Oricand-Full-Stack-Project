package dd.projects.demo.cart.dto;

import dd.projects.demo.cartentry.dto.CartEntryResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartResponseDto {
    private Long id;
    private List<CartEntryResponseDto> entries;
    private BigDecimal totalPrice;
}

