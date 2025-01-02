package taskmanager.com.Task.Manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import taskmanager.com.Task.Manager.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
