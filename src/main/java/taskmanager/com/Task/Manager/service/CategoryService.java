package taskmanager.com.Task.Manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import taskmanager.com.Task.Manager.model.Category;
import taskmanager.com.Task.Manager.model.Task;
import taskmanager.com.Task.Manager.repository.CategoryRepository;
import taskmanager.com.Task.Manager.repository.TaskRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private TaskRepository taskRepository;
    public List<Category> getAllCategories()
    {
        return categoryRepository.findAll();
    }
    public Optional<Category> getCategoryById(Long id)
    {
        return categoryRepository.findById(id);
    }
    public Category saveCategory(Category category)
    {
        List<Task> Tasks = category.getTasks().stream().map(task -> taskRepository.findById(task.getId()).orElseThrow(() -> new RuntimeException("Task not found with ID" + task.getId()))).toList();
        category.setTasks(Tasks);
        return categoryRepository.save(category);
    }

    public boolean updateCategory(long id, Category updatedCategory) {
        return categoryRepository.findById(id).map(category -> {
            category.setName(updatedCategory.getName());
            category.setDescription(updatedCategory.getDescription());

            // Fetch full Task objects by ID
            List<Task> updatedTasks = updatedCategory.getTasks().stream()
                    .map(task -> taskRepository.findById(task.getId())
                            .orElseThrow(() -> new RuntimeException("Task not found with ID " + task.getId())))
                    .toList();

            // Explicitly link each task to the category
            updatedTasks.forEach(task -> task.setCategory(category));

            // Clear and add updated tasks to ensure the relationship is persisted
            category.getTasks().clear();
            category.getTasks().addAll(updatedTasks);

            categoryRepository.save(category);
            return true;
        }).orElse(false);
    }
    public List<Category> getUserCategories(Long userId) {
        return categoryRepository.findByUserId(userId);
    }
    public void deleteCategory(Long id)
    {
        categoryRepository.deleteById(id);
    }
}
