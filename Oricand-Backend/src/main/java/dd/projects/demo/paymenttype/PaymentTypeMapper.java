package dd.projects.demo.paymenttype;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PaymentTypeMapper {
    PaymentTypeMapper INSTANCE = Mappers.getMapper(PaymentTypeMapper.class);

    default String toString(PaymentType paymentType) {
        return paymentType != null ? paymentType.name() : null;
    }

    default PaymentType toPaymentType(String paymentType) {
        return paymentType != null ? PaymentType.valueOf(paymentType) : null;
    }
}
