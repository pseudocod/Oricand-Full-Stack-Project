package dd.projects.demo.attribute.option;

import dd.projects.demo.attribute.option.dto.AttributeOptionRequestDto;
import dd.projects.demo.attribute.option.dto.AttributeOptionResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttributeOptionService {

    private final AttributeOptionRepository attributeOptionRepository;
    private final AttributeOptionMapper attributeOptionMapper;

    public List<AttributeOptionResponseDto> getAllAttributeOptions() {
        return attributeOptionRepository.findAll().stream()
                .map(attributeOptionMapper::toResponseDto)
                .toList();
    }

    public AttributeOptionResponseDto getAttributeOptionById(Long id) {
        AttributeOption option = attributeOptionRepository.findById(id)
                .orElseThrow(() -> new AttributeOptionNotFoundException(id));
        return attributeOptionMapper.toResponseDto(option);
    }

    public AttributeOptionResponseDto createAttributeOption(AttributeOptionRequestDto dto) {
        AttributeOption option = attributeOptionMapper.toEntity(dto);
        option = attributeOptionRepository.save(option);
        return attributeOptionMapper.toResponseDto(option);
    }

    @Transactional
    public AttributeOptionResponseDto updateAttributeOption(Long id, AttributeOptionRequestDto dto) {
        AttributeOption option = attributeOptionRepository.findById(id)
                .orElseThrow(() -> new AttributeOptionNotFoundException(id));
        attributeOptionMapper.updateFromDto(dto, option);
        return attributeOptionMapper.toResponseDto(option);
    }

    public void deleteAttributeOptionById(Long id) {
        if (!attributeOptionRepository.existsById(id)) {
            throw new AttributeOptionNotFoundException(id);
        }
        attributeOptionRepository.deleteById(id);
    }
}
