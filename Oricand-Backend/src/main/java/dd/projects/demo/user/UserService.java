package dd.projects.demo.user;

import dd.projects.demo.address.Address;
import dd.projects.demo.address.AddressRepository;
import dd.projects.demo.address.exception.AddressNotFoundException;
import dd.projects.demo.address.exception.UnauthorizedAddressAccessException;
import dd.projects.demo.security.CurrentUserProvider;
import dd.projects.demo.security.exception.InvalidCredentialsException;
import dd.projects.demo.user.dto.UserChangePasswordDto;
import dd.projects.demo.user.dto.UserEditRequestDto;
import dd.projects.demo.user.dto.UserResponseDto;
import dd.projects.demo.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final CurrentUserProvider currentUserProvider;

    @Transactional(readOnly = true)
    public UserResponseDto getCurrentUser() {
        User user = getCurrentUserOrThrow();
        return userMapper.toResponseDto(user);
    }

    @Transactional
    public UserResponseDto updateCurrentUser(UserEditRequestDto dto) {
        User user = getCurrentUserOrThrow();
        userMapper.updateUserFromDto(dto, user);
        return userMapper.toResponseDto(user);
    }

    @Transactional
    public void setDefaultDeliveryAddress(Long addressId) {
        User user = getCurrentUserOrThrow();
        Address address = getOwnedAddressOrThrow(addressId, user);
        user.setDefaultDeliveryAddress(address);
    }

    @Transactional
    public void setDefaultBillingAddress(Long addressId) {
        User user = getCurrentUserOrThrow();
        Address address = getOwnedAddressOrThrow(addressId, user);
        user.setDefaultBillingAddress(address);
    }

    @Transactional
    public void changePassword(UserChangePasswordDto dto) {
        User user = getCurrentUserOrThrow();

        if (!passwordEncoder.matches(dto.getOldPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
    }

    private User getCurrentUserOrThrow() {
        Long userId = currentUserProvider.getCurrentUserId();
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID " + userId));
    }

    private Address getOwnedAddressOrThrow(Long addressId, User user) {
        Address address = addressRepository.findByIdAndIsDeletedFalse(addressId)
                .orElseThrow(() -> new AddressNotFoundException(addressId));

        if (!address.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedAddressAccessException();
        }

        return address;
    }
}
