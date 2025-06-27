package dd.projects.demo.security;

import dd.projects.demo.security.exception.UserAuthenticationException;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class CurrentUserProvider {

    /**
     * Strict -- throws if not logged-in (keep for secured endpoints)
     */
    public Long getCurrentUserId() {
        Long id = getCurrentUserIdOrNull();
        if (id == null) {
            throw new UserAuthenticationException("User not authenticated.");
        }
        return id;
    }

    /**
     * Lenient -- returns null when visitor is anonymous
     */
    public Long getCurrentUserIdOrNull() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null ||
                auth instanceof AnonymousAuthenticationToken ||
                auth.getName() == null) {
            return null;                   // ← guest
        }
        return Long.parseLong(auth.getName());
    }

    public String getCurrentUserRole() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getAuthorities().isEmpty()) {
            throw new UserAuthenticationException("User role not found in security context.");
        }
        return auth.getAuthorities().iterator().next().getAuthority();
    }
}
