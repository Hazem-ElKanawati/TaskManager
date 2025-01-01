package taskmanager.com.Task.Manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import taskmanager.com.Task.Manager.model.Comment;
import taskmanager.com.Task.Manager.repository.CommentRepository;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;
    public CommentService(CommentRepository commentRepository)
    {
        this.commentRepository = commentRepository;
    }
    public void addComment(Comment comment)
    {
        commentRepository.save(comment);
    }
    public void  deleteComment(Long id)
    {
        commentRepository.deleteById(id);
    }
}
