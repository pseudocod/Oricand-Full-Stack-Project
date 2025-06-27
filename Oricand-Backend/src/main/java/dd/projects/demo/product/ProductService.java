package dd.projects.demo.product;

import dd.projects.demo.attribute.selected.SelectedAttribute;
import dd.projects.demo.attribute.selected.SelectedAttributeNotFoundException;
import dd.projects.demo.attribute.selected.SelectedAttributeRepository;
import dd.projects.demo.category.Category;
import dd.projects.demo.category.CategoryRepository;
import dd.projects.demo.category.exception.CategoryNotFoundException;
import dd.projects.demo.product.attribute.ProductAttribute;
import dd.projects.demo.product.attribute.ProductAttributeRepository;
import dd.projects.demo.product.dto.ProductRequestDto;
import dd.projects.demo.product.dto.ProductResponseDto;
import dd.projects.demo.product.exception.ProductNotFoundException;
import dd.projects.demo.product.image.ProductImage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SelectedAttributeRepository selectedAttributeRepository;
    private final ProductAttributeRepository productAttributeRepository;
    private final ProductMapper productMapper;

    public List<ProductResponseDto> getAllProducts(String sortBy) {
        Sort sort = resolveSort(sortBy);
        List<Product> products = productRepository.findAll(sort);
        return productMapper.toProductResponseDtoList(products);
    }

    public ProductResponseDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        return productMapper.toProductResponseDto(product);
    }

    @Transactional
    public ProductResponseDto createProduct(ProductRequestDto dto) {
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException(dto.getCategoryId()));
        System.out.println("Selected attributes: " + dto.getSelectedAttributeIds());

        Product product = productMapper.toEntity(dto);
        product.setCategory(category);

        product = productRepository.save(product);

        List<ProductAttribute> productAttributes = buildProductAttributes(product, dto.getSelectedAttributeIds());

        product.getProductAttributes().addAll(productAttributes);
        productAttributeRepository.saveAll(productAttributes);

        return productMapper.toProductResponseDto(product);
    }

    public List<ProductResponseDto> getMostRecentProducts(int limit) {
        return productRepository.findTop3ByOrderByAddedDateDesc()
                .stream()
                .map(productMapper::toProductResponseDto)
                .toList();
    }


    @Transactional
    public ProductResponseDto updateProduct(Long id, ProductRequestDto dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        productMapper.partialUpdateFromRequestDto(dto, product);

        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new CategoryNotFoundException(dto.getCategoryId()));
            product.setCategory(category);
        }

        productAttributeRepository.deleteAllByProductId(product.getId());

        List<ProductAttribute> updatedAttributes = buildProductAttributes(product, dto.getSelectedAttributeIds());

        product.getProductAttributes().clear();
        product.getProductAttributes().addAll(updatedAttributes);
        productAttributeRepository.saveAll(updatedAttributes);

        return productMapper.toProductResponseDto(product);
    }

    public List<ProductResponseDto> getProductsByCategoryId(Long categoryId, String sortBy) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException(categoryId));

        Sort sort = resolveSort(sortBy);

        List<Product> products = productRepository.findAllByCategory(category, sort);
        return productMapper.toProductResponseDtoList(productRepository.findAllByCategory(category, sort));
    }

    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        for (ProductImage image : product.getImages()) {
            try {
                Path path = Paths.get("uploads/products/", image.getFilename());
                Files.deleteIfExists(path);
            } catch (IOException e) {
                System.err.println("Failed to delete image: " + image.getFilename());
            }
        }

        productRepository.deleteById(id);
    }

    private Sort resolveSort(String sortBy) {
        if (sortBy == null || sortBy.isBlank()) {
            return Sort.unsorted();
        }
        
        return switch (sortBy) {
            case "nameAsc" -> Sort.by("name").ascending();
            case "nameDesc" -> Sort.by("name").descending();
            case "priceAsc" -> Sort.by("price").ascending();
            case "priceDesc" -> Sort.by("price").descending();
            case "dateAsc" -> Sort.by("addedDate").ascending();
            case "dateDesc" -> Sort.by("addedDate").descending();
            default -> Sort.unsorted();
        };
    }

    private List<ProductAttribute> buildProductAttributes(Product product, List<Long> attributeIds) {
        return attributeIds.stream()
                .map(id -> {
                    SelectedAttribute attr = selectedAttributeRepository.findById(id)
                            .orElseThrow(() -> new SelectedAttributeNotFoundException(id));
                    return ProductAttribute.builder()
                            .product(product)
                            .selectedAttribute(attr)
                            .build();
                })
                .toList();
    }

}
