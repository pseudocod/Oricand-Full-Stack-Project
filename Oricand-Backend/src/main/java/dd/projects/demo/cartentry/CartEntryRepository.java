package dd.projects.demo.cartentry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartEntryRepository extends JpaRepository<CartEntry, Long> {
    Optional<CartEntry> findByCartIdAndProductId(Long cartId, Long productId);
    
    @Query("SELECT ce FROM CartEntry ce " +
            "JOIN FETCH ce.product p " +
            "LEFT JOIN FETCH p.images " +
            "WHERE ce.cart.id = :cartId")
    List<CartEntry> findAllByCartIdWithProductImages(@Param("cartId") Long cartId);

}
