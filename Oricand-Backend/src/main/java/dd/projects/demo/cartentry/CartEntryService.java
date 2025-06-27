package dd.projects.demo.cartentry;

import dd.projects.demo.cart.Cart;
import dd.projects.demo.cartentry.dto.CartEntryCreateRequestDto;
import dd.projects.demo.cartentry.dto.CartEntryEditDto;
import dd.projects.demo.cartentry.dto.CartEntryResponseDto;
import dd.projects.demo.product.Product;
import dd.projects.demo.product.ProductRepository;
import dd.projects.demo.product.exception.ProductNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CartEntryService {

    private final CartEntryRepository cartEntryRepository;
    private final ProductRepository productRepository;
    private final CartEntryMapper cartEntryMapper;

    @Transactional
    public CartEntryResponseDto addToCart(Cart cart,
                                          CartEntryCreateRequestDto dto) {

        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new ProductNotFoundException(dto.getProductId()));

        CartEntry existing = cartEntryRepository.findByCartIdAndProductId(cart.getId(),
                        product.getId())
                .orElse(null);

        if (existing != null) {
            existing.setQuantity(existing.getQuantity() + dto.getQuantity());
            cartEntryRepository.save(existing);
            return cartEntryMapper.toResponseDto(existing);
        }

        CartEntry entry = cartEntryMapper.toEntity(dto);
        entry.setCart(cart);
        entry.setProduct(product);
        entry.setPricePerPiece(product.getPrice());

        cart.getCartEntries().add(entry);
        return cartEntryMapper.toResponseDto(cartEntryRepository.save(entry));
    }

    @Transactional
    public CartEntryResponseDto updateQuantity(Long entryId,
                                               CartEntryEditDto dto) {
        if (dto.getQuantity() < 1) {
            throw new IllegalArgumentException("Quantity must be at least 1");
        }

        CartEntry entry = cartEntryRepository.findById(entryId)
                .orElseThrow(() -> new CartEntryNotFoundException(entryId));

        entry.setQuantity(dto.getQuantity());
        return cartEntryMapper.toResponseDto(entry);
    }

    @Transactional
    public void removeFromCart(Long entryId) {
        if (!cartEntryRepository.existsById(entryId)) {
            throw new CartEntryNotFoundException(entryId);
        }
        cartEntryRepository.deleteById(entryId);
    }
}