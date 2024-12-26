package taskmanager.com.Task.Manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import taskmanager.com.Task.Manager.model.Task;
import taskmanager.com.Task.Manager.repository.TaskRepository;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks()
    {
        return taskRepository.findAll();
    }
    public Task addTask(Task task)
    {
        return taskRepository.save(task);
    }
    public boolean updateTask(long id , Task updatedTask)
    {
        if(taskRepository.existsById(id))
        {
            taskRepository.findById(id).map(task ->
            {
                task.setName(updatedTask.getName());
                task.setCompleted(updatedTask.isCompleted());
                return taskRepository.save(task);
            }).orElseThrow(() -> new RuntimeException("Task not found with id " + id));
            return true;
        }else
        {
            return false;
        }
    }
    public boolean deleteTask(long id)
    {
        if(taskRepository.existsById(id))
        {
            taskRepository.deleteById(id);
            return true;
        }else{
            return false;
        }
    }
}
