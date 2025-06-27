package dd.projects.demo.address;

import dd.projects.demo.address.dto.AddressRequestDto;
import dd.projects.demo.address.dto.AddressResponseDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface AddressMapper {

    AddressResponseDto toResponseDto(Address address);

    Address toEntity(AddressRequestDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateAddressFromDto(AddressRequestDto dto, @MappingTarget Address address);
}