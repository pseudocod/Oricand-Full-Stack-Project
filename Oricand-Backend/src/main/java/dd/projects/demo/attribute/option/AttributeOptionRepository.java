package dd.projects.demo.attribute.option;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AttributeOptionRepository extends JpaRepository<AttributeOption, Long> {
    Optional<AttributeOption> findByValue(String value);
}
