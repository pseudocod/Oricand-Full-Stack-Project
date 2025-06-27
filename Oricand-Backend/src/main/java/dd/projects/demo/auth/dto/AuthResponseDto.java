package dd.projects.demo.auth.dto;

import dd.projects.demo.user.dto.UserResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponseDto {
    private String token;
    private String refreshToken;
    private UserResponseDto user;
}
