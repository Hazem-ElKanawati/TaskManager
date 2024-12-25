package taskmanager.com.Task.Manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import taskmanager.com.Task.Manager.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
