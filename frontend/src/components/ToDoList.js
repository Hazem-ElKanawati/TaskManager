import React, { useEffect, useState } from "react";
import "./ToDoList.css";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [error, setError] = useState(false);

  const handleAddTask = () => {
    if (task.trim() === "") {
      setError(true);
      return;
    }
    setTasks([...tasks, { text: task, done: false }]);
    setTask("");
    setError(false);
  };

  const handleToggleDone = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleRefresh = () => {
    setTasks([]);
  };

  return (
    <div className="container">
      <div className="todo-list-section">
        <input
          type="text"
          className="form-control"
          placeholder="✍️ Add item..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="add-btn" onClick={handleAddTask}>
          Add
        </button>
        <button className="refresh" onClick={handleRefresh}>
          Refresh
        </button>
        <ul className="todo-list">
          {tasks.length === 0 && (
            <div className="no-items">No items to show</div>
          )}
          {tasks.map((t, index) => (
            <li
              key={index}
              className={t.done ? "danger" : ""}
              onClick={() => handleToggleDone(index)}
            >
              {t.text}
              <span
                className="close"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTask(index);
                }}
              >
                ❌
              </span>
            </li>
          ))}
        </ul>
        {error && <div className="err">Please add a valid task!</div>}
      </div>
    </div>
  );
}

export default ToDoList;
