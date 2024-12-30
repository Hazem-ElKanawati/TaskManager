import React, { useEffect, useState } from "react";
import "./ToDoList.css";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");

  const addTask = () => {
    if (!newTask.trim()) {
      alert("Task cannot be empty!");
      return;
    }
    const task = {
      id: Date.now(),
      title: newTask,
      priority: priority,
      status: "new",
    };
    setTasks([...tasks, task]);
    setNewTask("");
    setPriority("Medium");
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "new" ? "done" : "new" }
          : task
      )
    );
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "priority-high";
      case "Medium":
        return "priority-medium";
      case "Low":
        return "priority-low";
      default:
        return "";
    }
  };

  return (
    <div className="container">
      <div className="today">Manage Your Tasks</div>
      <div className="todo-list-section">
        <div className="add-control">
          <input
            type="text"
            className="form-control"
            placeholder="✍️ Add item..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <select
            className="priority-dropdown"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button className="add-btn" onClick={addTask}>
            Add
          </button>
          <button className="refresh hidden">Refresh</button>
        </div>
        <ul className="todo-list">
          {tasks.length === 0 && (
            <div className="no-items">No items to show</div>
          )}
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`animated flipInX ${getPriorityClass(
                task.priority
              )} ${task.status === "done" ? "danger" : ""}`}
            >
              <div className="checkbox">
                <label>
                  <span className="checkbox-mask"></span>
                  <input
                    type="checkbox"
                    checked={task.status === "done"}
                    onChange={() => toggleTaskStatus(task.id)}
                  />
                  {task.title} - <span><i>{task.priority} Priority</i></span>
                </label>
                <span className="close" onClick={() => removeTask(task.id)}>
                  ✕
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;
