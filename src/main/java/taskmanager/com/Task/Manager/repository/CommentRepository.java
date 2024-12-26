package taskmanager.com.Task.Manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import taskmanager.com.Task.Manager.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
