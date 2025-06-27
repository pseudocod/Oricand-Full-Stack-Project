package dd.projects.demo.category;

import dd.projects.demo.category.dto.CategoryRequestDto;
import dd.projects.demo.category.dto.CategoryResponseDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    Category toEntity(CategoryRequestDto dto);

    CategoryResponseDto toResponseDto(Category category);

    List<CategoryResponseDto> toResponseList(List<Category> categories);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFromDto(CategoryRequestDto dto, @MappingTarget Category category);
}
