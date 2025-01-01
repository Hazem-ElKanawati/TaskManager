package taskmanager.com.Task.Manager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import taskmanager.com.Task.Manager.model.Category;
import taskmanager.com.Task.Manager.model.Task;
import taskmanager.com.Task.Manager.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @GetMapping
    public List<Category> getAllCategories()
    {
        return categoryService.getAllCategories();
    }
    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable Long id)
    {
        return categoryService.getCategoryById(id).orElse(null);
    }
    @PostMapping
    public Category createCategory(@RequestBody Category category)
    {
        return categoryService.saveCategory(category);
    }
    @PutMapping("/{id}")
    public ResponseEntity<String> updateCategory(@PathVariable long id, @RequestBody Category updatedCategory)
    {
        boolean isUpdated = categoryService.updateCategory(id , updatedCategory);

        if(isUpdated)
        {
            return ResponseEntity.ok("Caregory with id " + id + " was updated successfully");
        }else
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Caregory with id " + id + " does not exist");
        }
    }
    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id)
    {
        categoryService.deleteCategory(id);
    }
}
