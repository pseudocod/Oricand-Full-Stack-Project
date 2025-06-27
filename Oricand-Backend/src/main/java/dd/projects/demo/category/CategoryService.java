package dd.projects.demo.category;

import dd.projects.demo.category.dto.CategoryRequestDto;
import dd.projects.demo.category.dto.CategoryResponseDto;
import dd.projects.demo.category.exception.CategoryMediaStorageException;
import dd.projects.demo.category.exception.CategoryNotFoundException;
import dd.projects.demo.product.image.exception.InvalidFileTypeException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public List<CategoryResponseDto> getAllCategories() {
        return categoryMapper.toResponseList(categoryRepository.findAll());
    }

    public CategoryResponseDto getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));
        return categoryMapper.toResponseDto(category);
    }

    public CategoryResponseDto createCategory(CategoryRequestDto dto) {
        Category category = categoryMapper.toEntity(dto);
        category = categoryRepository.save(category);

        handleMediaUpload(dto, category);
        return categoryMapper.toResponseDto(categoryRepository.save(category));
    }

    @Transactional
    public CategoryResponseDto updateCategory(Long id, CategoryRequestDto dto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));

        categoryMapper.updateFromDto(dto, category);
        handleMediaUpload(dto, category);

        return categoryMapper.toResponseDto(category);
    }

    private void handleMediaUpload(CategoryRequestDto dto, Category category) {
        String basePath = "uploads/categories/" + category.getId();

        if (dto.getCoverImage() != null && !dto.getCoverImage().isEmpty()) {
            String imagePath = saveFile(dto.getCoverImage(), basePath, "cover.jpg");
            category.setCoverImageUrl("/" + imagePath);
        }

        if (dto.getTeaserVideo() != null && !dto.getTeaserVideo().isEmpty()) {
            String videoPath = saveFile(dto.getTeaserVideo(), basePath, "teaser.mp4");
            category.setTeaserVideoUrl("/" + videoPath);
        }
    }

    private String saveFile(MultipartFile file, String directory, String baseFilename) {
        try {
            String contentType = file.getContentType();
            if (contentType == null || (!contentType.startsWith("image/") && !contentType.startsWith("video/"))) {
                throw new InvalidFileTypeException("Only image and video uploads are allowed.");
            }

            Path uploadDir = Paths.get(directory);
            Files.createDirectories(uploadDir);

            String extension = baseFilename.substring(baseFilename.lastIndexOf('.')); // ".jpg" or ".mp4"
            String hashedFilename = UUID.randomUUID() + "_" + baseFilename;

            Path filepath = uploadDir.resolve(hashedFilename);
            Files.copy(file.getInputStream(), filepath, StandardCopyOption.REPLACE_EXISTING);

            return (directory + "/" + hashedFilename).replace("\\", "/");
        } catch (IOException e) {
            throw new CategoryMediaStorageException("Failed to store file: " + baseFilename);
        }
    }


    public void deleteCategory(Long id) {
        categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));

        String basePath = "uploads/categories/" + id;
        Path path = Paths.get(basePath);

        if (Files.exists(path)) {
            try (var walk = Files.walk(path)) {
                walk.sorted(Comparator.reverseOrder())
                        .forEach(p -> {
                            try {
                                Files.delete(p);
                            } catch (IOException e) {
                                throw new CategoryMediaStorageException("Failed to delete file: " + p);
                            }
                        });
            } catch (IOException e) {
                throw new CategoryMediaStorageException("Failed to clean up category media folder");
            }
        }

        categoryRepository.deleteById(id);
    }
}
