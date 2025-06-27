package dd.projects.demo.cart;

import dd.projects.demo.cartentry.CartEntryMapper;
import dd.projects.demo.cart.dto.CartResponseDto;
import dd.projects.demo.cartentry.CartEntry;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.math.BigDecimal;
import java.util.List;

@Mapper(componentModel = "spring", uses = CartEntryMapper.class)
public interface CartMapper {

    @Named("calculateTotal")
    static BigDecimal calculateTotal(List<CartEntry> entries) {
        return entries.stream()
                .map(entry -> entry.getPricePerPiece().multiply(BigDecimal.valueOf(entry.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Mapping(target = "entries", source = "cartEntries")
    @Mapping(target = "totalPrice", source = "cartEntries", qualifiedByName = "calculateTotal")
    CartResponseDto toResponseDto(Cart cart);
}
