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
public class OrderCreateRequestDto {
    private Long cartId;
    private PaymentType paymentType;

    private Long deliveryAddressId; 
    private Long invoiceAddressId;  

    private AddressRequestDto deliveryAddress; 
    private AddressRequestDto invoiceAddress;  

    private Boolean useSameInvoiceAddress;
}

