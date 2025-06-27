package dd.projects.demo.contact;

import dd.projects.demo.contact.dto.ContactMessageRequestDto;
import dd.projects.demo.contact.dto.ContactMessageResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ContactMessageMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "submittedAt", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "adminNotes", ignore = true)
    @Mapping(target = "respondedAt", ignore = true)
    ContactMessage toEntity(ContactMessageRequestDto dto);
    
    ContactMessageResponseDto toResponseDto(ContactMessage entity);
} 