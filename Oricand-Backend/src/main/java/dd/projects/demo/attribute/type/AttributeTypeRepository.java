package dd.projects.demo.attribute.type;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AttributeTypeRepository extends JpaRepository<AttributeType, Long> {
    Optional<AttributeType> findByName(String attribute);
}
