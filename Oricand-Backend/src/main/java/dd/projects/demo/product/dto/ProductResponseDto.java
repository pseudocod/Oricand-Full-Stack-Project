package dd.projects.demo.product.dto;

import dd.projects.demo.attribute.selected.dto.SelectedAttributeResponseDto;
import dd.projects.demo.product.image.ProductImageDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponseDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer availableQuantity;
    private LocalDate addedDate;
    private Long categoryId;

    private List<ProductImageDto> images;
    private List<SelectedAttributeResponseDto> attributes;
}
