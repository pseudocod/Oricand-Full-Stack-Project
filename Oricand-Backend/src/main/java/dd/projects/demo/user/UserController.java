package dd.projects.demo.user;

import dd.projects.demo.user.dto.UserChangePasswordDto;
import dd.projects.demo.user.dto.UserEditRequestDto;
import dd.projects.demo.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getCurrentUser() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponseDto> updateCurrentUser(@RequestBody UserEditRequestDto dto) {
        return ResponseEntity.ok(userService.updateCurrentUser(dto));
    }

    @PutMapping("/me/password")
    public ResponseEntity<Void> changePassword(@RequestBody UserChangePasswordDto dto) {
        userService.changePassword(dto);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/me/default-delivery-address/{addressId}")
    public ResponseEntity<Void> setDefaultDeliveryAddress(@PathVariable Long addressId) {
        userService.setDefaultDeliveryAddress(addressId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/me/default-billing-address/{addressId}")
    public ResponseEntity<Void> setDefaultBillingAddress(@PathVariable Long addressId) {
        userService.setDefaultBillingAddress(addressId);
        return ResponseEntity.noContent().build();
    }
}
