package dd.projects.demo.attribute.selected.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SelectedAttributeRequestDto {
    private Long attributeId;
    private Long valueId;
}
