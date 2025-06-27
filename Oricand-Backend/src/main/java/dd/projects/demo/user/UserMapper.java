package dd.projects.demo.user;

import dd.projects.demo.address.AddressMapper;
import dd.projects.demo.user.dto.UserEditRequestDto;
import dd.projects.demo.user.dto.UserRegisterRequestDto;
import dd.projects.demo.user.dto.UserResponseDto;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = AddressMapper.class)
public interface UserMapper {

    @Mapping(target = "defaultDeliveryAddressId", source = "defaultDeliveryAddress.id")
    @Mapping(target = "defaultBillingAddressId", source = "defaultBillingAddress.id")
    UserResponseDto toResponseDto(User user);

    User toEntity(UserRegisterRequestDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUserFromDto(UserEditRequestDto dto, @MappingTarget User user);
}
