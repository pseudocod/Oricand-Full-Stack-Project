package dd.projects.demo.attribute.type;

import dd.projects.demo.attribute.type.dto.AttributeTypeRequestDto;
import dd.projects.demo.attribute.type.dto.AttributeTypeResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttributeTypeService {

    private final AttributeTypeRepository attributeTypeRepository;
    private final AttributeTypeMapper attributeTypeMapper;

    public List<AttributeTypeResponseDto> getAllAttributeTypes() {
        return attributeTypeRepository.findAll().stream()
                .map(attributeTypeMapper::toResponseDto)
                .toList();
    }

    public AttributeTypeResponseDto getAttributeTypeById(Long id) {
        AttributeType attributeType = attributeTypeRepository.findById(id)
                .orElseThrow(() -> new AttributeTypeNotFoundException(id));
        return attributeTypeMapper.toResponseDto(attributeType);
    }

    public AttributeTypeResponseDto createAttributeType(AttributeTypeRequestDto dto) {
        AttributeType attributeType = attributeTypeMapper.toEntity(dto);
        attributeType = attributeTypeRepository.save(attributeType);
        return attributeTypeMapper.toResponseDto(attributeType);
    }

    @Transactional
    public AttributeTypeResponseDto updateAttributeType(Long id, AttributeTypeRequestDto dto) {
        AttributeType attributeType = attributeTypeRepository.findById(id)
                .orElseThrow(() -> new AttributeTypeNotFoundException(id));
        attributeTypeMapper.updateFromDto(dto, attributeType);
        return attributeTypeMapper.toResponseDto(attributeType);
    }

    public void deleteAttributeTypeById(Long id) {
        if (!attributeTypeRepository.existsById(id)) {
            throw new AttributeTypeNotFoundException(id);
        }
        attributeTypeRepository.deleteById(id);
    }
}
