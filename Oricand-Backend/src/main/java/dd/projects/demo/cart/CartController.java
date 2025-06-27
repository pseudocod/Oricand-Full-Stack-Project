package dd.projects.demo.cart;

import dd.projects.demo.cart.dto.CartResponseDto;
import dd.projects.demo.cartentry.CartEntryService;
import dd.projects.demo.cartentry.dto.CartEntryCreateRequestDto;
import dd.projects.demo.cartentry.dto.CartEntryEditDto;
import dd.projects.demo.cartentry.dto.CartEntryResponseDto;
import dd.projects.demo.security.CurrentUserProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartResolver resolver;
    private final CurrentUserProvider userProvider;
    private final CartMapper mapper;
    private final CartEntryService entryService;

    @Transactional(readOnly = true)
    @GetMapping
    public CartResponseDto getCart(HttpServletRequest req,
                                   HttpServletResponse res) {

        Cart cart = resolver.resolve(req, res,
                userProvider.getCurrentUserIdOrNull(),
                false);

        return cart != null
                ? mapper.toResponseDto(cart)
                : CartResponseDto.builder()
                .id(null)
                .entries(List.of())
                .totalPrice(BigDecimal.ZERO)
                .build();
    }

    @PostMapping("/entries")
    @ResponseStatus(HttpStatus.CREATED)
    public CartEntryResponseDto addEntry(@RequestBody CartEntryCreateRequestDto dto,
                                         HttpServletRequest req,
                                         HttpServletResponse res) {

        Cart cart = resolver.resolve(req, res,
                userProvider.getCurrentUserIdOrNull(),
                true);

        return entryService.addToCart(cart, dto);
    }

    @PutMapping("/entries/{entryId}")
    public CartEntryResponseDto updateQuantity(@PathVariable Long entryId,
                                               @RequestBody CartEntryEditDto dto) {

        return entryService.updateQuantity(entryId, dto);
    }

    @DeleteMapping("/entries/{entryId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeEntry(@PathVariable Long entryId) {
        entryService.removeFromCart(entryId);
    }
}
