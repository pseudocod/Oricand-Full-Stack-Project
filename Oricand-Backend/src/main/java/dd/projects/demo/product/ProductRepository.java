package dd.projects.demo.product;

import dd.projects.demo.category.Category;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findProductByCategoryId(Long categoryId);

    List<Product> findAllByCategory(Category category, Sort sort);

    List<Product> findTop3ByOrderByAddedDateDesc();
    
    Optional<Product> findByName(String name);
}

