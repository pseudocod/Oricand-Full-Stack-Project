package dd.projects.demo.user.dto;

import dd.projects.demo.address.dto.AddressRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserEditRequestDto {
    private String firstName;
    private String lastName;
    private String phoneNumber;

    private AddressRequestDto defaultDeliveryAddress;
    private AddressRequestDto defaultBillingAddress;
}
