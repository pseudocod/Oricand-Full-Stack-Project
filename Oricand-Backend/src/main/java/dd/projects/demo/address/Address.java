package dd.projects.demo.address;

import dd.projects.demo.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "streetline", length = 255, nullable = false)
    private String streetLine;
    @Column(name = "postalcode", length = 50, nullable = false)
    private String postalCode;
    @Column(name = "city", length = 100, nullable = false)
    private String city;
    @Column(name = "county", length = 100, nullable = false)
    private String county;
    @Column(name = "country", length = 50, nullable = false)
    private String country;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    @Column(name = "is_deleted", nullable = false)
    @Builder.Default
    private Boolean isDeleted = false;
}
