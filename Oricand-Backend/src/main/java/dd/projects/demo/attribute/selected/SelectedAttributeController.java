package dd.projects.demo.attribute.selected;

import dd.projects.demo.attribute.selected.dto.SelectedAttributeRequestDto;
import dd.projects.demo.attribute.selected.dto.SelectedAttributeResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/selected-attributes")
@RequiredArgsConstructor
public class SelectedAttributeController {

    private final SelectedAttributeService selectedAttributeService;

    @GetMapping
    public ResponseEntity<List<SelectedAttributeResponseDto>> getAllSelectedAttributes() {
        return ResponseEntity.ok(selectedAttributeService.getAllSelectedAttributes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SelectedAttributeResponseDto> getSelectedAttributeById(@PathVariable Long id) {
        return ResponseEntity.ok(selectedAttributeService.getSelectedAttributeById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<SelectedAttributeResponseDto> createSelectedAttribute(
            @RequestBody SelectedAttributeRequestDto dto) {
        SelectedAttributeResponseDto created = selectedAttributeService.createSelectedAttribute(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<SelectedAttributeResponseDto> updateSelectedAttribute(
            @PathVariable Long id,
            @RequestBody SelectedAttributeRequestDto dto) {
        return ResponseEntity.ok(selectedAttributeService.updateSelectedAttribute(id, dto));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSelectedAttributeById(@PathVariable Long id) {
        selectedAttributeService.deleteSelectedAttributeById(id);
    }
}
