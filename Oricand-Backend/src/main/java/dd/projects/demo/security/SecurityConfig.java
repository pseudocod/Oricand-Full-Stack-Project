package dd.projects.demo.security;

import dd.projects.demo.security.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)

                /* ----------- CORS ----------- */
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                /* -------- authorisation ----- */
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**", "/uploads/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/categories/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()

                        /* cart endpoints – guests allowed */
                        .requestMatchers("/api/cart/**").permitAll()
                        
                        /* guest order endpoints */
                        .requestMatchers(HttpMethod.POST, "/api/orders/guest").permitAll()
                        
                        /* password reset endpoints – public access */
                        .requestMatchers("/api/auth/password/**").permitAll()
                        
                        /* contact form submission – public access */
                        .requestMatchers(HttpMethod.POST, "/api/contact/submit").permitAll()
                        
                        /* voting campaign info – public access */
                        .requestMatchers(HttpMethod.GET, "/api/voting/current").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/voting/campaign/**").permitAll()

                        /* admin or other secured endpoints */
                        .anyRequest().authenticated()
                )

                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /* -------- exact origin + credentials -------- */
    private UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();
        cfg.setAllowedOrigins(List.of("http://localhost:5173"));   //  ← your Vite/React dev origin
        cfg.setAllowCredentials(true);                             //  ← must be true to send cookie
        cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        cfg.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", cfg);
        source.registerCorsConfiguration("/auth/**", cfg);
        return source;
    }
}
