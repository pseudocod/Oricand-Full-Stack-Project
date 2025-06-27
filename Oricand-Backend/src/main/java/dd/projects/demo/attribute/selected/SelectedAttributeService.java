package dd.projects.demo.attribute.selected;

import dd.projects.demo.attribute.option.AttributeOption;
import dd.projects.demo.attribute.option.AttributeOptionNotFoundException;
import dd.projects.demo.attribute.option.AttributeOptionRepository;
import dd.projects.demo.attribute.selected.dto.SelectedAttributeRequestDto;
import dd.projects.demo.attribute.selected.dto.SelectedAttributeResponseDto;
import dd.projects.demo.attribute.type.AttributeType;
import dd.projects.demo.attribute.type.AttributeTypeNotFoundException;
import dd.projects.demo.attribute.type.AttributeTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SelectedAttributeService {

    private final SelectedAttributeRepository selectedAttributeRepository;
    private final SelectedAttributeMapper selectedAttributeMapper;
    private final AttributeTypeRepository attributeTypeRepository;
    private final AttributeOptionRepository attributeOptionRepository;

    public List<SelectedAttributeResponseDto> getAllSelectedAttributes() {
        return selectedAttributeRepository.findAll().stream()
                .map(selectedAttributeMapper::toResponseDto)
                .toList();
    }

    public SelectedAttributeResponseDto getSelectedAttributeById(Long id) {
        SelectedAttribute selectedAttribute = selectedAttributeRepository.findById(id)
                .orElseThrow(() -> new SelectedAttributeNotFoundException(id));
        return selectedAttributeMapper.toResponseDto(selectedAttribute);
    }

    public SelectedAttributeResponseDto createSelectedAttribute(SelectedAttributeRequestDto dto) {
        AttributeType type = attributeTypeRepository.findById(dto.getAttributeId())
                .orElseThrow(() -> new AttributeTypeNotFoundException(dto.getAttributeId()));

        AttributeOption option = attributeOptionRepository.findById(dto.getValueId())
                .orElseThrow(() -> new AttributeOptionNotFoundException(dto.getValueId()));

        SelectedAttribute selectedAttribute = SelectedAttribute.builder()
                .attribute(type)
                .value(option)
                .build();

        selectedAttribute = selectedAttributeRepository.save(selectedAttribute);
        return selectedAttributeMapper.toResponseDto(selectedAttribute);
    }

    @Transactional
    public SelectedAttributeResponseDto updateSelectedAttribute(Long id, SelectedAttributeRequestDto dto) {
        SelectedAttribute existing = selectedAttributeRepository.findById(id)
                .orElseThrow(() -> new SelectedAttributeNotFoundException(id));

        AttributeType type = attributeTypeRepository.findById(dto.getAttributeId())
                .orElseThrow(() -> new AttributeTypeNotFoundException(dto.getAttributeId()));
        AttributeOption option = attributeOptionRepository.findById(dto.getValueId())
                .orElseThrow(() -> new AttributeOptionNotFoundException(dto.getValueId()));

        existing.setAttribute(type);
        existing.setValue(option);
        return selectedAttributeMapper.toResponseDto(existing);
    }

    public void deleteSelectedAttributeById(Long id) {
        if (!selectedAttributeRepository.existsById(id)) {
            throw new SelectedAttributeNotFoundException(id);
        }
        selectedAttributeRepository.deleteById(id);
    }
}
