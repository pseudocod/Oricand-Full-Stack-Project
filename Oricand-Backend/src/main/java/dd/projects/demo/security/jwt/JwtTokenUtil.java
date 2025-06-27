package dd.projects.demo.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import dd.projects.demo.user.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

@Slf4j
@Component
public class JwtTokenUtil {
    
    @Value("${jwt.secret:MY_SUPER_SECRET_KEY_123456}")
    private String secretKey;
    
    @Value("${jwt.access-token-expiration:900000}") 
    private long accessTokenExpiration;
    
    @Value("${jwt.refresh-token-expiration:604800000}") 
    private long refreshTokenExpiration;

    public String generateAccessToken(User user) {
        return JWT.create()
                .withSubject(String.valueOf(user.getId()))
                .withClaim("role", user.getRole())
                .withClaim("email", user.getEmail())
                .withClaim("type", "access")
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + accessTokenExpiration))
                .sign(Algorithm.HMAC256(secretKey));
    }

    public String generateRefreshToken(User user) {
        return JWT.create()
                .withSubject(String.valueOf(user.getId()))
                .withClaim("type", "refresh")
                .withClaim("jti", UUID.randomUUID().toString()) 
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + refreshTokenExpiration))
                .sign(Algorithm.HMAC256(secretKey));
    }

    public String generateToken(User user) {
        return generateAccessToken(user);
    }

    public String getUserIdFromToken(String token) {
        DecodedJWT jwt = decodeToken(token);
        return jwt != null ? jwt.getSubject() : null;
    }

    public Long getUserIdAsLongFromToken(String token) {
        String userId = getUserIdFromToken(token);
        return userId != null ? Long.valueOf(userId) : null;
    }

    public String getEmailFromToken(String token) {
        DecodedJWT jwt = decodeToken(token);
        return jwt != null ? jwt.getClaim("email").asString() : null;
    }

    public String getRoleFromToken(String token) {
        DecodedJWT jwt = decodeToken(token);
        String role = jwt != null ? jwt.getClaim("role").asString() : null;
        return role;
    }

    public String getTokenType(String token) {
        DecodedJWT jwt = decodeToken(token);
        return jwt != null ? jwt.getClaim("type").asString() : null;
    }

    public boolean isTokenValid(String token) {
        try {
            JWT.require(Algorithm.HMAC256(secretKey))
                    .build()
                    .verify(token);
            return true;
        } catch (JWTVerificationException e) {
            return false;
        }
    }

    public boolean isTokenExpired(String token) {
        try {
            DecodedJWT jwt = JWT.require(Algorithm.HMAC256(secretKey))
                    .build()
                    .verify(token);
            return jwt.getExpiresAt().before(new Date());
        } catch (JWTVerificationException e) {
            return true; 
        }
    }

    public String getJtiFromToken(String token) {
        DecodedJWT jwt = decodeToken(token);
        return jwt != null ? jwt.getClaim("jti").asString() : null;
    }

    private DecodedJWT decodeToken(String token) {
        try {
            return JWT.require(Algorithm.HMAC256(secretKey))
                    .build()
                    .verify(token);
        } catch (JWTVerificationException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
            return null;
        }
    }
}
