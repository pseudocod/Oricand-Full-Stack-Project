//package dd.projects.demo.service;
//
//import static org.mockito.Mockito.*;
//import static org.junit.jupiter.api.Assertions.*;
//
//import dd.projects.demo.cart.dto.CartResponseDto;
//import dd.projects.demo.cartentry.dto.CartEntryCreateRequestDto;
//import dd.projects.demo.cart.Cart;
//import dd.projects.demo.cartentry.CartEntry;
//import dd.projects.demo.product.Product;
//import dd.projects.demo.cartentry.CartEntryRepository;
//import dd.projects.demo.cart.CartRepository;
//import dd.projects.demo.product.ProductRepository;
//import dd.projects.demo.user.UserRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import java.math.BigDecimal;
//import java.util.Optional;
//
//public class CartServiceTests {
//
//    @Mock
//    private CartRepository cartRepository;
//
//    @Mock
//    private UserRepository userRepository;
//
//    @Mock
//    private ProductRepository productRepository;
//
//    @Mock
//    private CartEntryRepository cartEntryRepository;
//
//    @InjectMocks
//    private CartService cartService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//
//    @Test
//    void addCartEntry_addsNewEntryWhenNotExisting() {
//        Cart cart = new Cart();
//        cart.setId(1L);
//        Product product = new Product();
//        product.setId(1L);
//        product.setAvailableQuantity(10);
//        product.setPrice(new BigDecimal("10.00"));
//        CartEntryCreateRequestDto requestDto = new CartEntryCreateRequestDto();
//        requestDto.setCartId(1L);
//        requestDto.setProductId(1L);
//        requestDto.setQuantity(5);
//
//        when(cartRepository.findById(1L)).thenReturn(Optional.of(cart));
//        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
//        when(cartEntryRepository.findCartEntryByProductAndCart(product, cart)).thenReturn(null);
//
//        CartResponseDto responseDto = cartService.addCartEntry(requestDto);
//
//        assertEquals(1, cart.getCartEntries().size());
//        assertEquals(5, cart.getCartEntries().get(0).getQuantity());
//        verify(cartEntryRepository, times(1)).save(any(CartEntry.class));
//        verify(cartRepository, times(1)).save(cart);
//    }
//
//    @Test
//    void addCartEntry_updatesExistingEntryWhenExisting() {
//        Cart cart = new Cart();
//        cart.setId(1L);
//        Product product = new Product();
//        product.setId(1L);
//        product.setAvailableQuantity(10);
//        product.setPrice(new BigDecimal("10.00"));
//        CartEntry existingEntry = new CartEntry();
//        existingEntry.setProduct(product);
//        existingEntry.setQuantity(3);
//        existingEntry.setPricePerPiece(new BigDecimal("10.00"));
//        cart.getCartEntries().add(existingEntry);
//        CartEntryCreateRequestDto requestDto = new CartEntryCreateRequestDto();
//        requestDto.setCartId(1L);
//        requestDto.setProductId(1L);
//        requestDto.setQuantity(5);
//
//        when(cartRepository.findById(1L)).thenReturn(Optional.of(cart));
//        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
//        when(cartEntryRepository.findCartEntryByProductAndCart(product, cart)).thenReturn(existingEntry);
//
//        CartResponseDto responseDto = cartService.addCartEntry(requestDto);
//
//        assertEquals(1, cart.getCartEntries().size());
//        assertEquals(8, cart.getCartEntries().get(0).getQuantity());
//        verify(cartEntryRepository, times(1)).save(existingEntry);
//        verify(cartRepository, times(1)).save(cart);
//    }
//    @Test
//    void addCartEntry_throwsExceptionWhenNotEnoughStock() {
//        Cart cart = new Cart();
//        cart.setId(1L);
//        Product product = new Product();
//        product.setId(1L);
//        product.setAvailableQuantity(5);
//        CartEntryCreateRequestDto requestDto = new CartEntryCreateRequestDto();
//        requestDto.setCartId(1L);
//        requestDto.setProductId(1L);
//        requestDto.setQuantity(10);
//
//        when(cartRepository.findById(1L)).thenReturn(Optional.of(cart));
//        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
//
//        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
//            cartService.addCartEntry(requestDto);
//        });
//
//        assertEquals("Not enough products in stock", exception.getMessage());
//        verify(cartEntryRepository, never()).save(any(CartEntry.class));
//        verify(cartRepository, never()).save(cart);
//    }
//
//    @Test
//    void addCartEntry_throwsExceptionWhenCartNotFound() {
//        CartEntryCreateRequestDto requestDto = new CartEntryCreateRequestDto();
//        requestDto.setCartId(1L);
//        requestDto.setProductId(1L);
//        requestDto.setQuantity(5);
//
//        when(cartRepository.findById(1L)).thenReturn(Optional.empty());
//
//        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
//            cartService.addCartEntry(requestDto);
//        });
//
//        assertEquals("Cart not found", exception.getMessage());
//        verify(cartEntryRepository, never()).save(any(CartEntry.class));
//        verify(cartRepository, never()).save(any(Cart.class));
//    }
//
//    @Test
//    void addCartEntry_throwsExceptionWhenProductNotFound() {
//        Cart cart = new Cart();
//        cart.setId(1L);
//        CartEntryCreateRequestDto requestDto = new CartEntryCreateRequestDto();
//        requestDto.setCartId(1L);
//        requestDto.setProductId(1L);
//        requestDto.setQuantity(5);
//
//        when(cartRepository.findById(1L)).thenReturn(Optional.of(cart));
//        when(productRepository.findById(1L)).thenReturn(Optional.empty());
//
//        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
//            cartService.addCartEntry(requestDto);
//        });
//
//        assertEquals("Product not found", exception.getMessage());
//        verify(cartEntryRepository, never()).save(any(CartEntry.class));
//        verify(cartRepository, never()).save(cart);
//    }
//
//    @Test
//    void addCartEntry_addsNewEntryWithPricePerPiece() {
//        Cart cart = new Cart();
//        cart.setId(1L);
//        Product product = new Product();
//        product.setId(1L);
//        product.setAvailableQuantity(10);
//        product.setPrice(BigDecimal.valueOf(20));
//        CartEntryCreateRequestDto requestDto = new CartEntryCreateRequestDto();
//        requestDto.setCartId(1L);
//        requestDto.setProductId(1L);
//        requestDto.setQuantity(5);
//
//        when(cartRepository.findById(1L)).thenReturn(Optional.of(cart));
//        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
//        when(cartEntryRepository.findCartEntryByProductAndCart(product, cart)).thenReturn(null);
//
//        CartResponseDto responseDto = cartService.addCartEntry(requestDto);
//
//        assertEquals(1, cart.getCartEntries().size());
//        assertEquals(5, cart.getCartEntries().get(0).getQuantity());
//        assertEquals(BigDecimal.valueOf(20), cart.getCartEntries().get(0).getPricePerPiece());
//        assertEquals(BigDecimal.valueOf(100), cart.getCartEntries().get(0).getTotalPriceEntry());
//        verify(cartEntryRepository, times(1)).save(any(CartEntry.class));
//        verify(cartRepository, times(1)).save(cart);
//    }
//
//
//    @Test
//    void addCartEntry_updatesExistingEntryWithPricePerPiece() {
//        Cart cart = new Cart();
//        cart.setId(1L);
//        Product product = new Product();
//        product.setId(1L);
//        product.setAvailableQuantity(10);
//        product.setPrice(BigDecimal.valueOf(20));
//        CartEntry existingEntry = new CartEntry();
//        existingEntry.setProduct(product);
//        existingEntry.setQuantity(3);
//        existingEntry.setPricePerPiece(BigDecimal.valueOf(20));
//        existingEntry.setTotalPriceEntry(BigDecimal.valueOf(60));
//        cart.getCartEntries().add(existingEntry);
//        CartEntryCreateRequestDto requestDto = new CartEntryCreateRequestDto();
//        requestDto.setCartId(1L);
//        requestDto.setProductId(1L);
//        requestDto.setQuantity(5);
//
//        when(cartRepository.findById(1L)).thenReturn(Optional.of(cart));
//        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
//        when(cartEntryRepository.findCartEntryByProductAndCart(product, cart)).thenReturn(existingEntry);
//
//        CartResponseDto responseDto = cartService.addCartEntry(requestDto);
//
//        assertEquals(1, cart.getCartEntries().size());
//        assertEquals(8, cart.getCartEntries().get(0).getQuantity());
//        assertEquals(BigDecimal.valueOf(20), cart.getCartEntries().get(0).getPricePerPiece());
//        assertEquals(BigDecimal.valueOf(160), cart.getCartEntries().get(0).getTotalPriceEntry());
//        verify(cartEntryRepository, times(1)).save(existingEntry);
//        verify(cartRepository, times(1)).save(cart);
//    }
//
//    @Test
//    void addCartEntry_updatesTotalPriceWhenAddingNewEntry() {
//        Cart cart = new Cart();
//        cart.setId(1L);
//        cart.setTotalPrice(BigDecimal.ZERO);
//        Product product = new Product();
//        product.setId(1L);
//        product.setAvailableQuantity(10);
//        product.setPrice(BigDecimal.valueOf(20));
//        CartEntryCreateRequestDto requestDto = new CartEntryCreateRequestDto();
//        requestDto.setCartId(1L);
//        requestDto.setProductId(1L);
//        requestDto.setQuantity(2);
//
//        when(cartRepository.findById(1L)).thenReturn(Optional.of(cart));
//        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
//        when(cartEntryRepository.findCartEntryByProductAndCart(product, cart)).thenReturn(null);
//
//        CartResponseDto responseDto = cartService.addCartEntry(requestDto);
//
//        assertEquals(BigDecimal.valueOf(40), cart.getTotalPrice());
//        verify(cartEntryRepository, times(1)).save(any(CartEntry.class));
//        verify(cartRepository, times(1)).save(cart);
//    }
//
//    @Test
//    void addCartEntry_updatesTotalPriceWhenUpdatingExistingEntry() {
//        Cart cart = new Cart();
//        cart.setId(1L);
//        cart.setTotalPrice(BigDecimal.valueOf(60));
//        Product product = new Product();
//        product.setId(1L);
//        product.setAvailableQuantity(10);
//        product.setPrice(BigDecimal.valueOf(20));
//        CartEntry existingEntry = new CartEntry();
//        existingEntry.setProduct(product);
//        existingEntry.setQuantity(3);
//        existingEntry.setPricePerPiece(BigDecimal.valueOf(20));
//        existingEntry.setTotalPriceEntry(BigDecimal.valueOf(60));
//        cart.getCartEntries().add(existingEntry);
//        CartEntryCreateRequestDto requestDto = new CartEntryCreateRequestDto();
//        requestDto.setCartId(1L);
//        requestDto.setProductId(1L);
//        requestDto.setQuantity(2);
//
//        when(cartRepository.findById(1L)).thenReturn(Optional.of(cart));
//        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
//        when(cartEntryRepository.findCartEntryByProductAndCart(product, cart)).thenReturn(existingEntry);
//
//        CartResponseDto responseDto = cartService.addCartEntry(requestDto);
//
//        assertEquals(BigDecimal.valueOf(100), cart.getTotalPrice());
//        verify(cartEntryRepository, times(1)).save(existingEntry);
//        verify(cartRepository, times(1)).save(cart);
//    }
//}
