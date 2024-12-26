package taskmanager.com.Task.Manager.model;

import jakarta.persistence.*;


@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String author;
    private String text;
    @ManyToOne
    @JoinColumn(name = "task_id")
    private Task task;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }
    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }
    public Task getTask() {
        return task;
    }
    public void setTask(Task task) {
        this.task = task;
    }
}
