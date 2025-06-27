package dd.projects.demo.contact;

import dd.projects.demo.contact.dto.ContactMessageRequestDto;
import dd.projects.demo.contact.dto.ContactMessageResponseDto;
import dd.projects.demo.contact.exception.ContactMessageNotFoundException;
import dd.projects.demo.email.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContactMessageService {
    
    private final ContactMessageRepository contactMessageRepository;
    private final ContactMessageMapper contactMessageMapper;
    private final EmailService emailService;
    
    @Transactional
    public ContactMessageResponseDto submitContactMessage(ContactMessageRequestDto requestDto) {
        log.info("Processing contact form submission from: {}", requestDto.getEmail());
        
        ContactMessage contactMessage = contactMessageMapper.toEntity(requestDto);
        ContactMessage savedMessage = contactMessageRepository.save(contactMessage);
        
        try {
            emailService.sendContactFormNotification(
                requestDto.getName(), 
                requestDto.getEmail(), 
                requestDto.getMessage()
            );
            
            emailService.sendContactFormConfirmation(
                requestDto.getName(), 
                requestDto.getEmail()
            );
        } catch (Exception e) {
            log.error("Failed to send contact form emails for submission from: {}", requestDto.getEmail(), e);
        }
        
        log.info("Contact message saved with ID: {}", savedMessage.getId());
        return contactMessageMapper.toResponseDto(savedMessage);
    }
    
    public Page<ContactMessageResponseDto> getAllContactMessages(Pageable pageable) {
        return contactMessageRepository.findAllByOrderBySubmittedAtDesc(pageable)
                .map(contactMessageMapper::toResponseDto);
    }
    
    public Page<ContactMessageResponseDto> getContactMessagesByStatus(ContactStatus status, Pageable pageable) {
        return contactMessageRepository.findByStatusOrderBySubmittedAtDesc(status, pageable)
                .map(contactMessageMapper::toResponseDto);
    }
    
    public List<ContactMessageResponseDto> getNewContactMessages() {
        return contactMessageRepository.findByStatusOrderBySubmittedAtDesc(ContactStatus.NEW)
                .stream()
                .map(contactMessageMapper::toResponseDto)
                .toList();
    }
    
    @Transactional
    public ContactMessageResponseDto updateContactMessageStatus(Long id, ContactStatus status, String adminNotes) {
        ContactMessage contactMessage = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ContactMessageNotFoundException("Contact message not found with ID: " + id));
        
        contactMessage.setStatus(status);
        contactMessage.setAdminNotes(adminNotes);
        
        if (status == ContactStatus.RESPONDED) {
            contactMessage.setRespondedAt(LocalDateTime.now());
        }
        
        ContactMessage updatedMessage = contactMessageRepository.save(contactMessage);
        log.info("Updated contact message {} to status: {}", id, status);
        
        return contactMessageMapper.toResponseDto(updatedMessage);
    }
    
    public ContactMessageResponseDto getContactMessageById(Long id) {
        ContactMessage contactMessage = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ContactMessageNotFoundException("Contact message not found with ID: " + id));
        
        return contactMessageMapper.toResponseDto(contactMessage);
    }
    
    public long getContactMessageCountByStatus(ContactStatus status) {
        return contactMessageRepository.countByStatus(status);
    }
} 