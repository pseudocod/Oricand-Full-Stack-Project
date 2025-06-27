package dd.projects.demo.product.attribute;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductAttributeRepository extends JpaRepository<ProductAttribute, Long> {
    void deleteAllByProductId(Long productId);
}
