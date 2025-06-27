//package dd.projects.demo.controller;
//
//import dd.projects.demo.domain.dto.Product.ProductCreateRequestDto;
//import dd.projects.demo.domain.dto.Product.ProductEditRequestDto;
//import dd.projects.demo.product.dto.ProductResponseDto;
//import dd.projects.demo.service.product.ProductService;
//import jakarta.persistence.EntityNotFoundException;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//
//import java.util.Collections;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.mockito.Mockito.*;
//
//class ProductControllerTest {
//
//    @Mock
//    private ProductService productService;
//
//    @InjectMocks
//    private ProductController productController;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    void getProductById_ReturnsProduct_WhenProductExists() {
//        Long productId = 1L;
//        ProductResponseDto productResponseDto = new ProductResponseDto();
//        when(productService.getProductById(productId)).thenReturn(productResponseDto);
//
//        ResponseEntity<ProductResponseDto> response = productController.getProductById(productId);
//
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertEquals(productResponseDto, response.getBody());
//    }
//
//    @Test
//    void getProductById_ReturnsNotFound_WhenProductDoesNotExist() {
//        Long productId = 1L;
//        when(productService.getProductById(productId)).thenThrow(EntityNotFoundException.class);
//
//        ResponseEntity<ProductResponseDto> response = productController.getProductById(productId);
//
//        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
//    }
//
//    @Test
//    void getAllProduct_ReturnsListOfProducts() {
//        List<ProductResponseDto> products = Collections.singletonList(new ProductResponseDto());
//        when(productService.getAllProducts()).thenReturn(products);
//
//        ResponseEntity<List<ProductResponseDto>> response = productController.getAllProduct();
//
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertEquals(products, response.getBody());
//    }
//
//    @Test
//    void createProduct_ReturnsCreatedProduct_WhenSuccessful() {
//        ProductCreateRequestDto requestDto = new ProductCreateRequestDto();
//        ProductResponseDto responseDto = new ProductResponseDto();
//        when(productService.createProduct(requestDto)).thenReturn(responseDto);
//
//        ResponseEntity<ProductResponseDto> response = productController.createProduct(requestDto);
//
//        assertEquals(HttpStatus.CREATED, response.getStatusCode());
//        assertEquals(responseDto, response.getBody());
//    }
//
//    @Test
//    void createProduct_ReturnsNotFound_WhenEntityNotFound() {
//        ProductCreateRequestDto requestDto = new ProductCreateRequestDto();
//        when(productService.createProduct(requestDto)).thenThrow(EntityNotFoundException.class);
//
//        ResponseEntity<ProductResponseDto> response = productController.createProduct(requestDto);
//
//        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
//    }
//
//    @Test
//    void updateProduct_ReturnsUpdatedProduct_WhenSuccessful() {
//        Long productId = 1L;
//        ProductEditRequestDto requestDto = new ProductEditRequestDto();
//        ProductResponseDto responseDto = new ProductResponseDto();
//        when(productService.editProduct(productId, requestDto)).thenReturn(responseDto);
//
//        ResponseEntity<ProductResponseDto> response = productController.updateProduct(productId, requestDto);
//
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertEquals(responseDto, response.getBody());
//    }
//
//    @Test
//    void updateProduct_ReturnsNotFound_WhenEntityNotFound() {
//        Long productId = 1L;
//        ProductEditRequestDto requestDto = new ProductEditRequestDto();
//        when(productService.editProduct(productId, requestDto)).thenThrow(EntityNotFoundException.class);
//
//        ResponseEntity<ProductResponseDto> response = productController.updateProduct(productId, requestDto);
//
//        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
//    }
//
//    @Test
//    void deleteProduct_ReturnsOk_WhenSuccessful() {
//        Long productId = 1L;
//        doNothing().when(productService).deleteProduct(productId);
//
//        ResponseEntity<Void> response = productController.deleteProduct(productId);
//
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//    }
//
//    @Test
//    void deleteProduct_ReturnsNotFound_WhenEntityNotFound() {
//        Long productId = 1L;
//        doThrow(EntityNotFoundException.class).when(productService).deleteProduct(productId);
//
//        ResponseEntity<Void> response = productController.deleteProduct(productId);
//
//        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
//    }
//}