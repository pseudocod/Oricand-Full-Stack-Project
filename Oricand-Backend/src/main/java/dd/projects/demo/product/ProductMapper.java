// ProductMapper.java
package dd.projects.demo.product;

import dd.projects.demo.attribute.selected.dto.SelectedAttributeResponseDto;
import dd.projects.demo.product.attribute.ProductAttribute;
import dd.projects.demo.product.dto.ProductRequestDto;
import dd.projects.demo.product.dto.ProductResponseDto;
import dd.projects.demo.product.image.ProductImage;
import dd.projects.demo.product.image.ProductImageDto;
import org.mapstruct.*;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(target = "attributes", source = "productAttributes")
    @Mapping(target = "images", source = "images")
    @Mapping(target = "categoryId", source = "category.id")
    ProductResponseDto toProductResponseDto(Product product);

    default List<SelectedAttributeResponseDto> mapProductAttributes(List<ProductAttribute> productAttributes) {
        if (productAttributes == null) return List.of();

        return productAttributes.stream()
                .map(attr -> SelectedAttributeResponseDto.builder()
                        .id(attr.getSelectedAttribute().getId())
                        .attributeId(attr.getSelectedAttribute().getAttribute().getId())
                        .attributeName(attr.getSelectedAttribute().getAttribute().getName())
                        .valueId(attr.getSelectedAttribute().getValue().getId())
                        .value(attr.getSelectedAttribute().getValue().getValue())
                        .build())
                .toList();
    }

    List<ProductResponseDto> toProductResponseDtoList(List<Product> products);

    @Mapping(target = "productAttributes", ignore = true)
    @Mapping(target = "images", ignore = true)
    Product toEntity(ProductRequestDto dto);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "name", source = "name")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "price", source = "price")
    @Mapping(target = "availableQuantity", source = "availableQuantity")
    Product partialUpdateFromRequestDto(ProductRequestDto dto, @MappingTarget Product product);

    default List<ProductImageDto> mapImages(List<ProductImage> images) {
        if (images == null) return List.of();

        return images.stream()
                .map(img -> ProductImageDto.builder()
                        .id(img.getId())
                        .url(img.getUrl())
                        .featured(img.isFeatured())
                        .build())
                .toList();
    }

    @AfterMapping
    default void initCollections(@MappingTarget Product product) {
        if (product.getProductAttributes() == null)
            product.setProductAttributes(new ArrayList<>());
        if (product.getImages() == null)
            product.setImages(new ArrayList<>());
    }
}
