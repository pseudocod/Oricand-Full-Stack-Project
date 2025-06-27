package dd.projects.demo.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class PasswordResetTokenCleanupTask {

    private final PasswordResetService passwordResetService;

    // Run every hour
    @Scheduled(fixedRate = 3600000) // 1 hour in milliseconds
    public void cleanupExpiredTokens() {
        log.debug("Starting scheduled cleanup of expired password reset tokens");
        passwordResetService.cleanupExpiredTokens();
    }
} 