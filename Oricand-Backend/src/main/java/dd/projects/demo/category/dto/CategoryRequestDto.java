package dd.projects.demo.category.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryRequestDto {
    private String name;
    private String description;
    private String theme;
    private MultipartFile coverImage;
    private MultipartFile teaserVideo;
    private LocalDate releaseDate;
    private String label;
    private String phrase;
}
