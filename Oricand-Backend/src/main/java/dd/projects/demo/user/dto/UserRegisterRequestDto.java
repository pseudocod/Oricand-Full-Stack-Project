package dd.projects.demo.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRegisterRequestDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
