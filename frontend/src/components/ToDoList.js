import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./ToDoList.css";

function ToDoList() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newTaskByCategory, setNewTaskByCategory] = useState({});
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setError("User ID not found. Please log in again.");
      return;
    }

    const fetchUserCategories = async () => {
      try {
        const response = await fetch(`http://localhost:8080/categories/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          const normalizedData = data.map((category) => ({
            ...category,
            tasks: category.tasks || [],
          }));
          setCategories(normalizedData);
        } else {
          const errorMsg = await response.text();
          setError(errorMsg || "Failed to fetch categories.");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Something went wrong while fetching categories.");
      }
    };

    fetchUserCategories();
  }, [userId]);

  const addCategory = async () => {
    if (!newCategory.trim()) {
      alert("Category name cannot be empty!");
      return;
    }

    const category = {
      name: newCategory,
      description: "Default description",
      user: { id: parseInt(userId, 10) },
    };

    try {
      const response = await fetch(`http://localhost:8080/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });

      if (response.ok) {
        const newCat = await response.json();
        setCategories((prevCategories) => [
          ...prevCategories,
          { ...newCat, tasks: [] },
        ]);
        setNewCategory("");
      } else {
        const errorMsg = await response.text();
        setError(errorMsg || "Failed to add category.");
      }
    } catch (err) {
      console.error("Error adding category:", err);
      setError("Something went wrong while adding the category.");
    }
  };

  const removeCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:8080/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== categoryId)
        );
      } else {
        const errorMsg = await response.text();
        setError(errorMsg || "Failed to remove category.");
      }
    } catch (err) {
      console.error("Error removing category:", err);
      setError("Something went wrong while removing the category.");
    }
  };

  const addTask = async (categoryId) => {
    const newTask = newTaskByCategory[categoryId];
    if (!newTask?.trim()) {
      alert("Task cannot be empty!");
      return;
    }

    const task = { name: newTask, completed: false, category: { id: categoryId } };

    try {
      const response = await fetch(`http://localhost:8080/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        const newTaskData = await response.json();
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === categoryId
              ? { ...category, tasks: [...(category.tasks || []), newTaskData] }
              : category
          )
        );
        setNewTaskByCategory((prev) => ({ ...prev, [categoryId]: "" }));
      } else {
        const errorMsg = await response.text();
        setError(errorMsg || "Failed to add task.");
      }
    } catch (err) {
      console.error("Error adding task:", err);
      setError("Something went wrong while adding the task.");
    }
  };

  const removeTask = async (categoryId, taskId) => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === categoryId
              ? {
                  ...category,
                  tasks: (category.tasks || []).filter((task) => task.id !== taskId),
                }
              : category
          )
        );
      } else {
        const errorMsg = await response.text();
        setError(errorMsg || "Failed to remove task.");
      }
    } catch (err) {
      console.error("Error removing task:", err);
      setError("Something went wrong while removing the task.");
    }
  };

  const toggleTaskStatus = async (taskId, categoryId) => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskId}/toggle`, {
        method: "PUT",
      });

      if (response.ok) {
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === categoryId
              ? {
                  ...category,
                  tasks: category.tasks.map((task) =>
                    task.id === taskId
                      ? { ...task, completed: !task.completed }
                      : task
                  ),
                }
              : category
          )
        );
      } else {
        const errorMsg = await response.text();
        setError(errorMsg || "Failed to toggle task status.");
      }
    } catch (err) {
      console.error("Error toggling task status:", err);
      setError("Something went wrong while toggling task status.");
    }
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container-fluid d-flex flex-column h-100">
        <header className="row">
          <div className="col-12 py-4 text-center fancy-welcome">
            <h1>Task Manager</h1>
          </div>
        </header>

        <div className="row flex-grow-1 d-flex justify-content-center align-items-center">
          <div className="col col-xl-8">
            <div className="card">
              <div className="card-body p-5">
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New category name"
                  />
                  <button className="btn btn-primary" onClick={addCategory}>
                    Add Category
                  </button>
                </div>

                {categories.map((category) => (
                  <div key={category.id} className="mb-4">
                    <h4>
                      {category.name}
                      <button
                        className="btn btn-danger btn-sm ms-2"
                        onClick={() => removeCategory(category.id)}
                      >
                        Delete
                      </button>
                    </h4>
                    <ul className="list-group mb-3">
                      {(category.tasks || []).map((task) => (
                        <li
                          key={task.id}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <input
                            type="checkbox"
                            className="form-check-input me-2"
                            checked={task.completed}
                            onChange={() => toggleTaskStatus(task.id, category.id)}
                          />
                          <span
                            style={{
                              textDecoration: task.completed ? "line-through" : "none",
                            }}
                          >
                            {task.name}
                          </span>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeTask(category.id, task.id)}
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={newTaskByCategory[category.id] || ""}
                      onChange={(e) =>
                        setNewTaskByCategory((prev) => ({
                          ...prev,
                          [category.id]: e.target.value,
                        }))
                      }
                      placeholder="New task name"
                    />
                    <button
                      className="btn btn-info"
                      onClick={() => addTask(category.id)}
                    >
                      Add Task
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
          <p>© 2025 Task Manager. All Rights Reserved.</p>
        </footer>
      </div>
    </section>
  );
}

export default ToDoList;
