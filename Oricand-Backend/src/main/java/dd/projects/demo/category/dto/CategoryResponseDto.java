package dd.projects.demo.category.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryResponseDto {
    private Long id;
    private String name;
    private String description;
    private String theme;
    private String coverImageUrl;
    private String teaserVideoUrl;
    private LocalDate releaseDate;
    private String label;
    private String phrase;
}

