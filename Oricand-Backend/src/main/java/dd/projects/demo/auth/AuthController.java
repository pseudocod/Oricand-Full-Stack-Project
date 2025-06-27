package dd.projects.demo.auth;

import dd.projects.demo.auth.dto.AuthResponseDto;
import dd.projects.demo.auth.dto.RefreshTokenRequestDto;
import dd.projects.demo.security.CurrentUserProvider;
import dd.projects.demo.user.dto.UserLoginRequestDto;
import dd.projects.demo.user.dto.UserRegisterRequestDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final CurrentUserProvider currentUserProvider;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> registerUser(@RequestBody UserRegisterRequestDto dto,
                                                        HttpServletRequest req,
                                                        HttpServletResponse res) {
        return ResponseEntity.ok(authService.registerUser(dto, req, res));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> loginUser(
            @RequestBody UserLoginRequestDto dto,
            HttpServletRequest req,
            HttpServletResponse res) {

        return ResponseEntity.ok(authService.loginUser(dto, req, res));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponseDto> refreshToken(@RequestBody RefreshTokenRequestDto dto) {
        return ResponseEntity.ok(authService.refreshToken(dto));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody RefreshTokenRequestDto dto) {
        authService.logout(dto.getRefreshToken());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout-all")
    public ResponseEntity<Void> logoutAll() {
        Long userId = currentUserProvider.getCurrentUserId();
        authService.logoutAll(userId);
        return ResponseEntity.ok().build();
    }
}
