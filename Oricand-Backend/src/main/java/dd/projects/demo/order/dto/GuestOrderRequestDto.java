package dd.projects.demo.order.dto;

import dd.projects.demo.address.dto.AddressRequestDto;
import dd.projects.demo.paymenttype.PaymentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GuestOrderRequestDto {
    private Long cartId;

    private String email; 
    private String firstName;
    private String lastName;
    private String phoneNumber;

    private PaymentType paymentType;

    private AddressRequestDto deliveryAddress;
    private AddressRequestDto invoiceAddress; 
    
    @Builder.Default
    private Boolean useSameInvoiceAddress = true;
} 