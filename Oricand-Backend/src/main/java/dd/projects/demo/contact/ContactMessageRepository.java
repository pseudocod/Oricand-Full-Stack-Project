package dd.projects.demo.contact;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    
    List<ContactMessage> findByStatusOrderBySubmittedAtDesc(ContactStatus status);
    
    Page<ContactMessage> findAllByOrderBySubmittedAtDesc(Pageable pageable);
    
    Page<ContactMessage> findByStatusOrderBySubmittedAtDesc(ContactStatus status, Pageable pageable);
    
    @Query("SELECT cm FROM ContactMessage cm WHERE cm.submittedAt BETWEEN :startDate AND :endDate ORDER BY cm.submittedAt DESC")
    List<ContactMessage> findBySubmittedAtBetween(@Param("startDate") LocalDateTime startDate, 
                                                  @Param("endDate") LocalDateTime endDate);
    
    long countByStatus(ContactStatus status);
} 