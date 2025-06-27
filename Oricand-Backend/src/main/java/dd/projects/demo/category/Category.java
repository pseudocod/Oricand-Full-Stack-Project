package dd.projects.demo.category;

import dd.projects.demo.product.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 255, nullable = false)
    private String name;

    @Column(length = 2000, nullable = false)
    private String description;

    @Column(length = 100)
    private String theme;

    @Column
    private LocalDate releaseDate;

    @Column(length = 1000)
    private String coverImageUrl;

    @Column(length = 1000)
    private String teaserVideoUrl;

    @Column(length = 1000)
    private String label;

    @Column(length = 1000)
    private String phrase;
    
    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    private List<Product> products;
}
