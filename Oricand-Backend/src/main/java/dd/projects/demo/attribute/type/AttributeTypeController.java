package dd.projects.demo.attribute.type;

import dd.projects.demo.attribute.type.dto.AttributeTypeRequestDto;
import dd.projects.demo.attribute.type.dto.AttributeTypeResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attribute-types")
@RequiredArgsConstructor
public class AttributeTypeController {

    private final AttributeTypeService attributeTypeService;

    @GetMapping
    public ResponseEntity<List<AttributeTypeResponseDto>> getAllAttributeTypes() {
        return ResponseEntity.ok(attributeTypeService.getAllAttributeTypes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttributeTypeResponseDto> getAttributeTypeById(@PathVariable Long id) {
        return ResponseEntity.ok(attributeTypeService.getAttributeTypeById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<AttributeTypeResponseDto> createAttributeType(
            @RequestBody AttributeTypeRequestDto dto) {
        AttributeTypeResponseDto created = attributeTypeService.createAttributeType(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<AttributeTypeResponseDto> updateAttributeType(
            @PathVariable Long id,
            @RequestBody AttributeTypeRequestDto dto) {
        return ResponseEntity.ok(attributeTypeService.updateAttributeType(id, dto));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAttributeTypeById(@PathVariable Long id) {
        attributeTypeService.deleteAttributeTypeById(id);
    }
}
