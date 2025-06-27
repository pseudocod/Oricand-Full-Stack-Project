package dd.projects.demo.cart;


import dd.projects.demo.user.UserRepository;
import io.micrometer.common.lang.Nullable;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CartResolver {
    private final CartRepository cartRepo;
    private final UserRepository userRepo;

    public Cart resolve(HttpServletRequest req, HttpServletResponse res,
                        @Nullable Long userId, boolean createIfMissing) {

        if (userId != null) {
            List<Cart> carts = cartRepo.findAllByUserId(userId);

            if (!carts.isEmpty()) {
                carts.sort(Comparator.comparingLong(Cart::getId));
                Cart head = carts.get(0);
                carts.stream().skip(1).forEach(cartRepo::delete);
                return head;
            }

            return cartRepo.save(Cart.builder()
                    .user(userRepo.getReferenceById(userId))
                    .build());
        }

        String token = Arrays.stream(Optional.ofNullable(req.getCookies()).orElse(new Cookie[0]))
                .filter(c -> "cartId".equals(c.getName()))
                .map(Cookie::getValue).findFirst().orElse(null);

        if (token != null) {
            Cart existing = cartRepo.findByCookieToken(token).orElse(null);
            if (existing != null) return existing;
        }

        return createIfMissing ? createGuestCart(res) : null;
    }

    private Cart createGuestCart(HttpServletResponse res) {
        Cart c = new Cart();
        c.setCookieToken(UUID.randomUUID().toString());
        cartRepo.save(c);

        Cookie ck = new Cookie("cartId", c.getCookieToken());
        ck.setPath("/");
        ck.setHttpOnly(true);
        ck.setMaxAge(60 * 60 * 24 * 30);
        res.addCookie(ck);
        return c;
    }
}
