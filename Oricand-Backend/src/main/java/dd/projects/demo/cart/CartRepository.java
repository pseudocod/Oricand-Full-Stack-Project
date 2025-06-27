package dd.projects.demo.cart;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUserId(Long userId);

    Optional<Cart> findByCookieToken(String token);

    List<Cart> findAllByUserId(Long userId);
}
