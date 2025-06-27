//package dd.projects.demo.service;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//import dd.projects.demo.domain.dto.Product.ProductCreateRequestDto;
//import dd.projects.demo.domain.dto.Product.ProductEditRequestDto;
//import dd.projects.demo.product.dto.ProductResponseDto;
//import dd.projects.demo.category.Category;
//import dd.projects.demo.product.Product;
//import dd.projects.demo.repository.*;
//import jakarta.persistence.EntityNotFoundException;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import java.util.List;
//import java.util.Optional;
//
//public class ProductServiceTests {
//
//    @Mock
//    private ProductRepository productRepository;
//    @Mock
//    private ProductAttributeConcreteRepository productAttributeConcreteRepository;
//    @Mock
//    private AttributeValueConcreteRepository attributeValueConcreteRepository;
//    @Mock
//    private ProductAttributeGenericRepository productAttributeGenericRepository;
//    @Mock
//    private AttributeValueGenericRepository attributeValueGenericRepository;
//    @Mock
//    private CategoryRepository categoryRepository;
//
//    @InjectMocks
//    private ProductService productService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    void shouldReturnProductById() {
//        Product product = new Product();
//        product.setId(1L);
//        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
//        ProductResponseDto result = productService.getProductById(1L);
//        assertNotNull(result);
//        assertEquals(1L, result.getId());
//    }
//
//    @Test
//    void shouldThrowExceptionWhenProductNotFoundById() {
//        when(productRepository.findById(1L)).thenReturn(Optional.empty());
//        assertThrows(EntityNotFoundException.class, () -> productService.getProductById(1L));
//    }
//
//    @Test
//    void shouldReturnAllProducts() {
//        List<Product> products = List.of(new Product(), new Product());
//        when(productRepository.findAll()).thenReturn(products);
//        List<ProductResponseDto> result = productService.getAllProducts();
//        assertEquals(2, result.size());
//    }
//
//    @Test
//    void shouldCreateProductSuccessfully() {
//        ProductCreateRequestDto request = new ProductCreateRequestDto();
//        request.setCategoryId(1L);
//        Category category = new Category();
//        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
//        when(productRepository.save(any(Product.class))).thenReturn(new Product());
//        ProductResponseDto result = productService.createProduct(request);
//        assertNotNull(result);
//    }
//
//    @Test
//    void shouldThrowExceptionWhenCategoryNotFoundOnCreate() {
//        ProductCreateRequestDto request = new ProductCreateRequestDto();
//        request.setCategoryId(1L);
//        when(categoryRepository.findById(1L)).thenReturn(Optional.empty());
//        assertThrows(EntityNotFoundException.class, () -> productService.createProduct(request));
//    }
//
//    @Test
//    void shouldEditProductSuccessfully() {
//        ProductEditRequestDto request = new ProductEditRequestDto();
//        request.setCategoryId(1L);
//        Product product = new Product();
//        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
//        when(categoryRepository.findById(1L)).thenReturn(Optional.of(new Category()));
//        when(productRepository.save(any(Product.class))).thenReturn(product);
//        ProductResponseDto result = productService.editProduct(1L, request);
//        assertNotNull(result);
//    }
//
//    @Test
//    void shouldThrowExceptionWhenProductNotFoundOnEdit() {
//        ProductEditRequestDto request = new ProductEditRequestDto();
//        when(productRepository.findById(1L)).thenReturn(Optional.empty());
//        assertThrows(EntityNotFoundException.class, () -> productService.editProduct(1L, request));
//    }
//
//    @Test
//    void shouldDeleteProductSuccessfully() {
//        Product product = new Product();
//        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
//        doNothing().when(productRepository).delete(product);
//        productService.deleteProduct(1L);
//        verify(productRepository, times(1)).delete(product);
//    }
//
//    @Test
//    void shouldThrowExceptionWhenProductNotFoundOnDelete() {
//        when(productRepository.findById(1L)).thenReturn(Optional.empty());
//        assertThrows(EntityNotFoundException.class, () -> productService.deleteProduct(1L));
//    }
//}