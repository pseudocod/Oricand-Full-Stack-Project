package dd.projects.demo.attribute.selected.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SelectedAttributeResponseDto {
    private Long id;

    private Long attributeId;
    private String attributeName;

    private Long valueId;
    private String value;
}
