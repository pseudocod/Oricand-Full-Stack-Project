package dd.projects.demo.attribute.option.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AttributeOptionResponseDto {
    private Long id;
    private String value;
}
