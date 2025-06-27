package dd.projects.demo.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductSummaryDto {
    private Long id;
    private String name;
    private String featuredImageUrl;
}