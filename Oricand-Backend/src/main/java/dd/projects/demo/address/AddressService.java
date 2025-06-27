package dd.projects.demo.address;

import dd.projects.demo.address.dto.AddressRequestDto;
import dd.projects.demo.address.dto.AddressResponseDto;
import dd.projects.demo.address.exception.AddressNotFoundException;
import dd.projects.demo.address.exception.UnauthorizedAddressAccessException;
import dd.projects.demo.security.CurrentUserProvider;
import dd.projects.demo.user.User;
import dd.projects.demo.user.UserRepository;
import dd.projects.demo.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final AddressMapper addressMapper;
    private final UserRepository userRepository;
    private final CurrentUserProvider currentUserProvider;

    public List<AddressResponseDto> getCurrentUserAddresses() {
        Long userId = currentUserProvider.getCurrentUserId();

        return addressRepository.findAllByUserIdAndIsDeletedFalse(userId).stream()
                .map(addressMapper::toResponseDto)
                .toList();
    }
    
    public AddressResponseDto getAddressById(Long id) {
        Address address = addressRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new AddressNotFoundException(id));

        validateOwnership(address.getUser().getId());
        return addressMapper.toResponseDto(address);
    }

    public AddressResponseDto createAddress(AddressRequestDto dto) {
        Long userId = currentUserProvider.getCurrentUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Address address = addressMapper.toEntity(dto);
        address.setUser(user);

        return addressMapper.toResponseDto(addressRepository.save(address));
    }

    @Transactional
    public AddressResponseDto updateAddress(Long id, AddressRequestDto dto) {
        Address address = addressRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new AddressNotFoundException(id));

        validateOwnership(address.getUser().getId());

        addressMapper.updateAddressFromDto(dto, address);
        return addressMapper.toResponseDto(address);
    }

    public void deleteAddress(Long id) {
        Address address = addressRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new AddressNotFoundException(id));

        validateOwnership(address.getUser().getId());
        address.setIsDeleted(true);
        addressRepository.save(address);
    }

    private void validateOwnership(Long addressOwnerId) {
        if (!currentUserProvider.getCurrentUserId().equals(addressOwnerId)) {
            throw new UnauthorizedAddressAccessException();
        }
    }
}
