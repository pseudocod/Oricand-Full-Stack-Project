package dd.projects.demo.user;

import dd.projects.demo.user.dto.ForgotPasswordRequestDto;
import dd.projects.demo.user.dto.ResetPasswordRequestDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/auth/password")
@RequiredArgsConstructor
public class PasswordResetController {

    private final PasswordResetService passwordResetService;

    @PostMapping("/forgot")
    public ResponseEntity<String> forgotPassword(@Valid @RequestBody ForgotPasswordRequestDto request) {
        passwordResetService.initiatePasswordReset(request);
        return ResponseEntity.ok("If the email exists, password reset instructions have been sent");
    }

    @PostMapping("/reset")
    public ResponseEntity<String> resetPassword(@Valid @RequestBody ResetPasswordRequestDto request) {
        passwordResetService.resetPassword(request);
        return ResponseEntity.ok("Password has been successfully reset");
    }
} 