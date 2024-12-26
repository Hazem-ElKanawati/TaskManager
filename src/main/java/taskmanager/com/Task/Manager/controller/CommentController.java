package taskmanager.com.Task.Manager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import taskmanager.com.Task.Manager.model.Comment;
import taskmanager.com.Task.Manager.service.CommentService;

@RestController
@RequestMapping("/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;
    @PostMapping
    public void addComment(@RequestBody Comment comment)
    {
        commentService.addComment(comment);
    }
    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Long id)
    {
        commentService.deleteComment(id);
    }
}
