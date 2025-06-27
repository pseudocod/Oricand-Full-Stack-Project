package dd.projects.demo.address;

import dd.projects.demo.address.dto.AddressRequestDto;
import dd.projects.demo.address.dto.AddressResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @GetMapping
    public ResponseEntity<List<AddressResponseDto>> getAllAddressesForCurrentUser() {
        return ResponseEntity.ok(addressService.getCurrentUserAddresses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AddressResponseDto> getAddressById(@PathVariable Long id) {
        return ResponseEntity.ok(addressService.getAddressById(id));
    }

    @PostMapping
    public ResponseEntity<AddressResponseDto> createAddress(@RequestBody AddressRequestDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(addressService.createAddress(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AddressResponseDto> updateAddress(
            @PathVariable Long id,
            @RequestBody AddressRequestDto dto) {
        return ResponseEntity.ok(addressService.updateAddress(id, dto));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAddress(@PathVariable Long id) {
        addressService.deleteAddress(id);
    }
}
