package dd.projects.demo.address.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddressResponseDto {
    private Long id;
    private String streetLine;
    private String postalCode;
    private String city;
    private String county;
    private String country;
}
