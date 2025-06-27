package dd.projects.demo.auth;

import dd.projects.demo.security.exception.InvalidRefreshTokenException;
import dd.projects.demo.security.jwt.JwtTokenUtil;
import dd.projects.demo.user.User;
import dd.projects.demo.user.UserRepository;
import dd.projects.demo.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;

    @Value("${jwt.refresh-token-expiration:604800000}") // 7 days default
    private long refreshTokenExpiration;

    @Value("${jwt.max-refresh-tokens-per-user:5}")
    private int maxRefreshTokensPerUser;

    @Transactional
    public String createRefreshToken(User user) {
        cleanupExcessTokensForUser(user);

        String jwtToken = jwtTokenUtil.generateRefreshToken(user);
        String jti = jwtTokenUtil.getJtiFromToken(jwtToken);

        RefreshToken refreshToken = RefreshToken.builder()
                .token(jti != null ? jti : UUID.randomUUID().toString())
                .user(user)
                .expiryDate(Instant.now().plusMillis(refreshTokenExpiration))
                .build();

        refreshTokenRepository.save(refreshToken);

        return jwtToken;
    }

    @Transactional
    public RefreshToken validateRefreshToken(String token) {
        if (!jwtTokenUtil.isTokenValid(token)) {
            throw InvalidRefreshTokenException.invalidToken();
        }

        String tokenType = jwtTokenUtil.getTokenType(token);
        if (!"refresh".equals(tokenType)) {
            throw InvalidRefreshTokenException.wrongTokenType();
        }

        String jti = jwtTokenUtil.getJtiFromToken(token);
        if (jti == null) {
            throw InvalidRefreshTokenException.invalidToken();
        }

        RefreshToken refreshToken = refreshTokenRepository.findByToken(jti)
                .orElseThrow(InvalidRefreshTokenException::tokenNotFound);

        if (!refreshToken.isValid()) {
            if (refreshToken.isExpired()) {
                refreshTokenRepository.delete(refreshToken);
                throw InvalidRefreshTokenException.tokenExpired();
            } else {
                throw InvalidRefreshTokenException.tokenRevoked();
            }
        }

        return refreshToken;
    }

    @Transactional
    public String refreshAccessToken(String refreshTokenString) {
        RefreshToken refreshToken = validateRefreshToken(refreshTokenString);
        return jwtTokenUtil.generateAccessToken(refreshToken.getUser());
    }

    @Transactional
    public void revokeRefreshToken(String token) {
        try {
            String jti = jwtTokenUtil.getJtiFromToken(token);
            if (jti != null) {
                RefreshToken refreshToken = refreshTokenRepository.findByToken(jti)
                        .orElse(null);
                if (refreshToken != null) {
                    refreshToken.setRevoked(true);
                    refreshTokenRepository.save(refreshToken);
                }
            }
        } catch (Exception e) {
            log.warn("Failed to revoke refresh token: {}", e.getMessage());
        }
    }

    @Transactional
    public void revokeAllUserTokens(User user) {
        refreshTokenRepository.revokeAllByUser(user);
    }

    @Transactional
    public void revokeAllUserTokens(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        revokeAllUserTokens(user);
    }

    private void cleanupExcessTokensForUser(User user) {
        long validTokenCount = refreshTokenRepository.countValidTokensByUser(user, Instant.now());
        if (validTokenCount >= maxRefreshTokensPerUser) {
            refreshTokenRepository.revokeAllByUser(user);
            log.info("Revoked all refresh tokens for user {} due to limit exceeded", user.getId());
        }
    }

    @Scheduled(fixedRate = 3600000) 
    @Transactional
    public void cleanupExpiredTokens() {
        try {
            refreshTokenRepository.deleteExpiredTokens(Instant.now());
            log.debug("Cleaned up expired refresh tokens");
        } catch (Exception e) {
            log.error("Failed to cleanup expired refresh tokens", e);
        }
    }

    public User getUserFromRefreshToken(String token) {
        RefreshToken refreshToken = validateRefreshToken(token);
        return refreshToken.getUser();
    }
} 