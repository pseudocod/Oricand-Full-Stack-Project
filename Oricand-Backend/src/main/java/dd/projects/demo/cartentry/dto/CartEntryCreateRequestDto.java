package dd.projects.demo.cartentry.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartEntryCreateRequestDto {
    private Long productId;
    private Integer quantity;
}
