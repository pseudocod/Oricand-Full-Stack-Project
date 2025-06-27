package dd.projects.demo.attribute.option;

import dd.projects.demo.attribute.option.dto.AttributeOptionRequestDto;
import dd.projects.demo.attribute.option.dto.AttributeOptionResponseDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface AttributeOptionMapper {

    AttributeOption toEntity(AttributeOptionRequestDto dto);

    AttributeOptionResponseDto toResponseDto(AttributeOption entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFromDto(AttributeOptionRequestDto dto, @MappingTarget AttributeOption entity);
}