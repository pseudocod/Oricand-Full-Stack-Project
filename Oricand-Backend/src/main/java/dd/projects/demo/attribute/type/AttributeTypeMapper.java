// ProductAttributeGenericMapper.java
package dd.projects.demo.attribute.type;

import dd.projects.demo.attribute.type.dto.AttributeTypeRequestDto;
import dd.projects.demo.attribute.type.dto.AttributeTypeResponseDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface AttributeTypeMapper {

    AttributeType toEntity(AttributeTypeRequestDto dto);

    AttributeTypeResponseDto toResponseDto(AttributeType entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFromDto(AttributeTypeRequestDto dto, @MappingTarget AttributeType entity);
}