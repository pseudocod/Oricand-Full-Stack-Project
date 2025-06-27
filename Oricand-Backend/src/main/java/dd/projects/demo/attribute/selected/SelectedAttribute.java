package dd.projects.demo.attribute.selected;

import dd.projects.demo.attribute.option.AttributeOption;
import dd.projects.demo.attribute.type.AttributeType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class SelectedAttribute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "attribute_id", nullable = false)
    private AttributeType attribute;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "value_id", nullable = false)
    private AttributeOption value;
}
