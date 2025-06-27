package dd.projects.demo.contact.dto;

import dd.projects.demo.contact.ContactStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ContactMessageResponseDto {
    private Long id;
    private String name;
    private String email;
    private String message;
    private LocalDateTime submittedAt;
    private ContactStatus status;
    private String adminNotes;
    private LocalDateTime respondedAt;
} 