package taskmanager.com.Task.Manager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @PutMapping("/{id}")
    public ResponseEntity<String> updateTask(@PathVariable long id, @RequestBody Task updatedTask)
    {
       boolean isUpdated = taskService.updateTask(id , updatedTask);

       if(isUpdated)
       {
           return ResponseEntity.ok("Task with id " + id + " was updated successfully");
       }else
       {
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task with id " + id + " does not exist");
       }
    }
    @PutMapping("/{id}/toggle")
    public ResponseEntity<String> toggleTaskCompletion(@PathVariable long id) {
        boolean isUpdated = taskService.toggleTaskCompletion(id);

        if (isUpdated) {
            return ResponseEntity.ok("Task with id " + id + " was toggled successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task with id " + id + " does not exist");
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable long id)
    {
        boolean isDeleted = taskService.deleteTask(id);

        if(isDeleted){
            return ResponseEntity.ok("Task with id " + id + " was deleted successfully.");
        }else
        {
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id " + id + " does not exist.");
        }
    }

}
