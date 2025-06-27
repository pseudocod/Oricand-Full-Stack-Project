package dd.projects.demo.order;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByUserIdOrderByOrderDateDesc(Long userId);

    List<Order> findAllByUserIdAndStatusOrderByOrderDateDesc(Long userId, OrderStatus status);

    Optional<Order> findByIdAndUserId(Long id, Long userId);

    List<Order> findAllByOrderByOrderDateDesc();

    List<Order> findAllByStatusOrderByOrderDateDesc(OrderStatus status);

    List<Order> findAllByGuestEmailAndUserIsNullOrderByOrderDateDesc(String guestEmail);
}
