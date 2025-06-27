// CartEntryMapper.java
package dd.projects.demo.cartentry;

import dd.projects.demo.cartentry.dto.CartEntryCreateRequestDto;
import dd.projects.demo.cartentry.dto.CartEntryResponseDto;
import dd.projects.demo.product.Product;
import dd.projects.demo.product.dto.ProductSummaryDto;
import dd.projects.demo.product.image.ProductImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.math.BigDecimal;

@Mapper(componentModel = "spring")
public interface CartEntryMapper {

    @Mapping(target = "product", source = "product", qualifiedByName = "mapProductToSummary")
    @Mapping(target = "totalPriceEntry", source = ".", qualifiedByName = "calculateTotalPrice")
    CartEntryResponseDto toResponseDto(CartEntry entry);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "cart", ignore = true)
    @Mapping(target = "product", ignore = true)
    @Mapping(target = "pricePerPiece", ignore = true)
    CartEntry toEntity(CartEntryCreateRequestDto dto);

    @Named("mapProductToSummary")
    default ProductSummaryDto mapProductToSummary(Product product) {
        if (product == null) return null;

        String featuredImageUrl = product.getImages().stream()
                .filter(ProductImage::isFeatured)
                .findFirst()
                .map(ProductImage::getUrl)
                .orElse(null);

        return ProductSummaryDto.builder()
                .id(product.getId())
                .name(product.getName())
                .featuredImageUrl(featuredImageUrl)
                .build();
    }

    @Named("calculateTotalPrice")
    default BigDecimal calculateTotalPrice(CartEntry entry) {
        return entry.getPricePerPiece().multiply(BigDecimal.valueOf(entry.getQuantity()));
    }
}
