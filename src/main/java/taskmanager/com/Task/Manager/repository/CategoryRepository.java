package taskmanager.com.Task.Manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import taskmanager.com.Task.Manager.model.Category;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByUserId(Long userId);
}
