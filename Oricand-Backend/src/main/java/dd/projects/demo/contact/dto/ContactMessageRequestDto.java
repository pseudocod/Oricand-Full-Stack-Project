package dd.projects.demo.contact.dto;

import lombok.Data;

@Data
public class ContactMessageRequestDto {
    private String name;
    private String email;
    private String message;
} 