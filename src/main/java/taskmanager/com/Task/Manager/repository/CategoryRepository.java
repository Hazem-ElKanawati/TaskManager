package taskmanager.com.Task.Manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import taskmanager.com.Task.Manager.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
