package dd.projects.demo.user;

import dd.projects.demo.email.EmailService;
import dd.projects.demo.user.dto.ForgotPasswordRequestDto;
import dd.projects.demo.user.dto.ResetPasswordRequestDto;
import dd.projects.demo.user.exception.InvalidTokenException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;

@Slf4j
@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final SecureRandom secureRandom = new SecureRandom();

    @Transactional
    public void initiatePasswordReset(ForgotPasswordRequestDto request) {
        String email = request.getEmail().toLowerCase().trim();
        
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            log.warn("Password reset requested for non-existent email: {}", email);
            return; 
        }

        tokenRepository.deleteByUser(user);

        String token = generateSecureToken();
        
        PasswordResetToken resetToken = PasswordResetToken.builder()
                .token(token)
                .user(user)
                .expiryDate(LocalDateTime.now().plusHours(1))
                .build();
        
        tokenRepository.save(resetToken);

        emailService.sendForgotPasswordEmail(email, token);
        
        log.info("Password reset token generated for user: {}", email);
    }

    @Transactional
    public void resetPassword(ResetPasswordRequestDto request) {
        PasswordResetToken resetToken = tokenRepository.findByToken(request.getToken())
                .orElseThrow(InvalidTokenException::notFound);

        if (resetToken.isUsed()) {
            throw InvalidTokenException.alreadyUsed();
        }

        if (resetToken.isExpired()) {
            throw InvalidTokenException.expired();
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        resetToken.setUsed(true);
        tokenRepository.save(resetToken);

        log.info("Password successfully reset for user: {}", user.getEmail());
    }

    @Transactional
    public void cleanupExpiredTokens() {
        tokenRepository.deleteByExpiryDateBefore(LocalDateTime.now());
        log.info("Cleaned up expired password reset tokens");
    }

    private String generateSecureToken() {
        byte[] tokenBytes = new byte[32];
        secureRandom.nextBytes(tokenBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
    }
} 