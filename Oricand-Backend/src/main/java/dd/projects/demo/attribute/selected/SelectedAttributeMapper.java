package dd.projects.demo.attribute.selected;

import dd.projects.demo.attribute.selected.dto.SelectedAttributeRequestDto;
import dd.projects.demo.attribute.selected.dto.SelectedAttributeResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SelectedAttributeMapper {

    @Mapping(target = "attribute.id", source = "attributeId")
    @Mapping(target = "value.id", source = "valueId")
    SelectedAttribute toEntity(SelectedAttributeRequestDto dto);

    @Mapping(source = "attribute.id", target = "attributeId")
    @Mapping(source = "attribute.name", target = "attributeName")
    @Mapping(source = "value.id", target = "valueId")
    @Mapping(source = "value.value", target = "value")
    SelectedAttributeResponseDto toResponseDto(SelectedAttribute entity);
}
