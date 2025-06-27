package dd.projects.demo.attribute.selected;

import dd.projects.demo.attribute.option.AttributeOption;
import dd.projects.demo.attribute.type.AttributeType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SelectedAttributeRepository extends JpaRepository<SelectedAttribute, Long> {
    List<SelectedAttribute> findByAttributeAndValue(AttributeType attributeGeneric, AttributeOption value);
}
