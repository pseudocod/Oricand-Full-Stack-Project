package dd.projects.demo.auth;

import dd.projects.demo.auth.dto.AuthResponseDto;
import dd.projects.demo.auth.dto.RefreshTokenRequestDto;
import dd.projects.demo.cart.Cart;
import dd.projects.demo.cart.CartRepository;
import dd.projects.demo.cartentry.CartEntry;
import dd.projects.demo.email.EmailService;
import dd.projects.demo.loyalty.LoyaltyCardService;
import dd.projects.demo.order.OrderService;
import dd.projects.demo.security.exception.InvalidCredentialsException;
import dd.projects.demo.security.jwt.JwtTokenUtil;
import dd.projects.demo.user.User;
import dd.projects.demo.user.UserMapper;
import dd.projects.demo.user.UserRepository;
import dd.projects.demo.user.dto.UserLoginRequestDto;
import dd.projects.demo.user.dto.UserRegisterRequestDto;
import dd.projects.demo.user.exception.EmailAlreadyUsedException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserMapper userMapper;
    private final CartRepository cartRepository;
    private final OrderService orderService;
    private final EmailService emailService;
    private final RefreshTokenService refreshTokenService;
    private final LoyaltyCardService loyaltyCardService;

    @Transactional
    public AuthResponseDto registerUser(UserRegisterRequestDto dto,
                                        HttpServletRequest req,
                                        HttpServletResponse res) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new EmailAlreadyUsedException(dto.getEmail());
        }

        User user = userMapper.toEntity(dto);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole("ROLE_USER");
        user = userRepository.save(user);
        log.info("Created new user with ID: {}", user.getId());

        try {
            loyaltyCardService.createLoyaltyCard(user.getId());
            log.info("Created loyalty card for user: {}", user.getId());
        } catch (Exception e) {
            log.error("Failed to create loyalty card for user: {}", user.getId(), e);
            throw e;
        }

        adoptGuestCartIfAny(user, req, res);

        int claimedOrders = orderService.claimGuestOrders(dto.getEmail(), user.getId());
        if (claimedOrders > 0) {
            log.info("Claimed {} guest orders for user: {}", claimedOrders, dto.getEmail());
        }

        try {
            emailService.sendWelcomeEmail(user);
            log.info("Sent welcome email to user: {}", user.getEmail());
        } catch (Exception e) {
            log.error("Failed to send welcome email to user: {}", user.getEmail(), e);
            // Don't throw - email failure shouldn't prevent registration
        }

        User finalUser = user;
        cartRepository.findByUserId(user.getId())
                .orElseGet(() -> cartRepository.save(Cart.builder()
                        .user(finalUser)
                        .build()));

        String accessToken = jwtTokenUtil.generateAccessToken(user);
        String refreshToken = refreshTokenService.createRefreshToken(user);

        return new AuthResponseDto(accessToken, refreshToken, userMapper.toResponseDto(user));
    }


    @Transactional
    public AuthResponseDto loginUser(UserLoginRequestDto dto,
                                     HttpServletRequest req,
                                     HttpServletResponse res) {

        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Could not authenticate user"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Could not authenticate user");
        }

        adoptGuestCartIfAny(user, req, res);

        String accessToken = jwtTokenUtil.generateAccessToken(user);
        String refreshToken = refreshTokenService.createRefreshToken(user);

        return new AuthResponseDto(accessToken, refreshToken, userMapper.toResponseDto(user));
    }

    private void adoptGuestCartIfAny(User user, HttpServletRequest req,
                                     HttpServletResponse res) {

        String token = Arrays.stream(Optional.ofNullable(req.getCookies())
                        .orElse(new Cookie[0]))
                .filter(c -> "cartId".equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);

        if (token == null) return;

        Cart guest = cartRepository.findByCookieToken(token).orElse(null);
        if (guest == null) return;

        Cart userCart = cartRepository.findByUserId(user.getId()).orElse(null);

        if (userCart == null) {
            guest.setUser(user);
            guest.setCookieToken(null);
            cartRepository.save(guest);

        } else {
            Map<Long, CartEntry> existing = userCart.getCartEntries()
                    .stream()
                    .collect(Collectors.toMap(
                            e -> e.getProduct().getId(),
                            Function.identity()));

            for (CartEntry gEntry : guest.getCartEntries()) {
                Long prodId = gEntry.getProduct().getId();
                CartEntry match = existing.get(prodId);

                if (match != null) {
                    match.setQuantity(match.getQuantity() + gEntry.getQuantity());
                } else {
                    gEntry.setCart(userCart);
                    userCart.getCartEntries().add(gEntry);
                }
            }

            cartRepository.delete(guest);
        }

        Cookie del = new Cookie("cartId", "");
        del.setPath("/");
        del.setMaxAge(0);
        res.addCookie(del);
    }

    @Transactional
    public AuthResponseDto refreshToken(RefreshTokenRequestDto dto) {
        if (dto.getRefreshToken() == null || dto.getRefreshToken().trim().isEmpty()) {
            throw new InvalidCredentialsException("Refresh token is required");
        }

        User user = refreshTokenService.getUserFromRefreshToken(dto.getRefreshToken());
        String newAccessToken = jwtTokenUtil.generateAccessToken(user);

        return AuthResponseDto.builder()
                .token(newAccessToken)
                .refreshToken(dto.getRefreshToken())
                .user(userMapper.toResponseDto(user))
                .build();
    }

    @Transactional
    public void logout(String refreshToken) {
        if (refreshToken != null && !refreshToken.trim().isEmpty()) {
            refreshTokenService.revokeRefreshToken(refreshToken);
        }
    }

    @Transactional
    public void logoutAll(Long userId) {
        refreshTokenService.revokeAllUserTokens(userId);
    }

}
