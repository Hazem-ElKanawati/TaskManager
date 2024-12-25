package taskmanager.com.Task.Manager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import taskmanager.com.Task.Manager.model.Task;
import taskmanager.com.Task.Manager.service.TaskService;

import java.util.List;


@RestController
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getAllTasks()
    {
        return taskService.getAllTasks();
    }
    @PostMapping
    public Task addTask(@RequestBody Task task)
    {
        return taskService.addTask(task);
    }

}
