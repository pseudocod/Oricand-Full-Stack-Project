package dd.projects.demo.attribute.option;

import dd.projects.demo.attribute.option.dto.AttributeOptionRequestDto;
import dd.projects.demo.attribute.option.dto.AttributeOptionResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attribute-options")
@RequiredArgsConstructor
public class AttributeOptionController {

    private final AttributeOptionService attributeOptionService;

    @GetMapping
    public ResponseEntity<List<AttributeOptionResponseDto>> getAllAttributeOptions() {
        return ResponseEntity.ok(attributeOptionService.getAllAttributeOptions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttributeOptionResponseDto> getAttributeOptionById(@PathVariable Long id) {
        return ResponseEntity.ok(attributeOptionService.getAttributeOptionById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<AttributeOptionResponseDto> createAttributeOption(
            @RequestBody AttributeOptionRequestDto dto) {
        AttributeOptionResponseDto created = attributeOptionService.createAttributeOption(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<AttributeOptionResponseDto> updateAttributeOption(
            @PathVariable Long id,
            @RequestBody AttributeOptionRequestDto dto) {
        return ResponseEntity.ok(attributeOptionService.updateAttributeOption(id, dto));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAttributeOptionById(@PathVariable Long id) {
        attributeOptionService.deleteAttributeOptionById(id);
    }
}
