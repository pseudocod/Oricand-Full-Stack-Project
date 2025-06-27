package dd.projects.demo.address;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {

    List<Address> findAllByUserIdAndIsDeletedFalse(Long userId);

    Optional<Address> findByIdAndIsDeletedFalse(Long id);

    List<Address> findAllByUserId(Long userId);

    Optional<Address> findById(Long id);
}