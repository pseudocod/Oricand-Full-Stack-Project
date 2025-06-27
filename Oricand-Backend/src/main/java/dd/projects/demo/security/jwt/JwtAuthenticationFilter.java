package dd.projects.demo.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenUtil jwtTokenUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);

        try {
            if (!jwtTokenUtil.isTokenValid(token)) {
                log.debug("Invalid JWT token");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            String tokenType = jwtTokenUtil.getTokenType(token);
            if (!"access".equals(tokenType)) {
                log.debug("Token is not an access token: {}", tokenType);
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                return;
            }

            Long userId = jwtTokenUtil.getUserIdAsLongFromToken(token);
            String userEmail = jwtTokenUtil.getEmailFromToken(token);
            String userRole = jwtTokenUtil.getRoleFromToken(token);

            if (userRole == null || userRole.isEmpty()) {
                userRole = "ROLE_USER";
            }

            UserDetails userDetails = User.withUsername(String.valueOf(userId))
                    .password("")
                    .authorities(userRole)
                    .build();

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (Exception ex) {
            log.debug("JWT authentication failed: {}", ex.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        filterChain.doFilter(request, response);
    }
}