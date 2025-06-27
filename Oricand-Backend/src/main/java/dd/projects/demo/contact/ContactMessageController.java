package dd.projects.demo.contact;

import dd.projects.demo.contact.dto.ContactMessageRequestDto;
import dd.projects.demo.contact.dto.ContactMessageResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactMessageController {
    
    private final ContactMessageService contactMessageService;
    
    @PostMapping("/submit")
    public ResponseEntity<Map<String, String>> submitContactMessage(@Valid @RequestBody ContactMessageRequestDto requestDto) {
        log.info("Received contact form submission from: {}", requestDto.getEmail());
        
        try {
            contactMessageService.submitContactMessage(requestDto);
            return ResponseEntity.ok(Map.of(
                "message", "Thank you for your message! We'll get back to you soon.",
                "status", "success"
            ));
        } catch (Exception e) {
            log.error("Error processing contact form submission", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                        "message", "Sorry, there was an error sending your message. Please try again later.",
                        "status", "error"
                    ));
        }
    }
    
    @GetMapping("/admin/messages")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<ContactMessageResponseDto>> getAllContactMessages(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<ContactMessageResponseDto> messages = contactMessageService.getAllContactMessages(pageable);
        return ResponseEntity.ok(messages);
    }
    
    @GetMapping("/admin/messages/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<ContactMessageResponseDto>> getContactMessagesByStatus(
            @PathVariable ContactStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<ContactMessageResponseDto> messages = contactMessageService.getContactMessagesByStatus(status, pageable);
        return ResponseEntity.ok(messages);
    }
    
    @GetMapping("/admin/messages/new")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ContactMessageResponseDto>> getNewContactMessages() {
        List<ContactMessageResponseDto> newMessages = contactMessageService.getNewContactMessages();
        return ResponseEntity.ok(newMessages);
    }
    
    @GetMapping("/admin/messages/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ContactMessageResponseDto> getContactMessageById(@PathVariable Long id) {
        ContactMessageResponseDto message = contactMessageService.getContactMessageById(id);
        return ResponseEntity.ok(message);
    }
    
    @PutMapping("/admin/messages/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ContactMessageResponseDto> updateContactMessageStatus(
            @PathVariable Long id,
            @RequestBody Map<String, Object> updateRequest) {
        
        ContactStatus status = ContactStatus.valueOf((String) updateRequest.get("status"));
        String adminNotes = (String) updateRequest.get("adminNotes");
        
        ContactMessageResponseDto updatedMessage = contactMessageService.updateContactMessageStatus(id, status, adminNotes);
        return ResponseEntity.ok(updatedMessage);
    }
    
    @GetMapping("/admin/messages/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Long>> getContactMessageStats() {
        Map<String, Long> stats = Map.of(
            "new", contactMessageService.getContactMessageCountByStatus(ContactStatus.NEW),
            "inProgress", contactMessageService.getContactMessageCountByStatus(ContactStatus.IN_PROGRESS),
            "responded", contactMessageService.getContactMessageCountByStatus(ContactStatus.RESPONDED),
            "closed", contactMessageService.getContactMessageCountByStatus(ContactStatus.CLOSED)
        );
        return ResponseEntity.ok(stats);
    }
} 