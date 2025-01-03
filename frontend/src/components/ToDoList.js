import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./ToDoList.css";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [currentTab, setCurrentTab] = useState("All");
  const [tabs, setTabs] = useState(["All", "Active", "Completed"]);
  const [newTab, setNewTab] = useState("");

  // Simulated username (replace with backend value)
  const username = "Abdelrhaman";

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) {
      alert("Task cannot be empty!");
      return;
    }
    const task = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const removeTab = (tabToRemove) => {
    if (["All", "Active", "Completed"].includes(tabToRemove)) {
      alert("Default tabs cannot be deleted.");
      return;
    }
    setTabs(tabs.filter((tab) => tab !== tabToRemove));
    if (currentTab === tabToRemove) {
      setCurrentTab("All");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (currentTab === "Active") return !task.completed;
    if (currentTab === "Completed") return task.completed;
    return true;
  });

  const addNewTab = () => {
    if (newTab && !tabs.includes(newTab)) {
      setTabs([...tabs, newTab]);
      setNewTab("");
    } else {
      alert("Tab already exists or empty");
    }
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container-fluid d-flex flex-column h-100">
        {/* Fancy Welcome Section */}
        <header className="row">
          <div className="col-12 py-4 text-center fancy-welcome">
            <h1>
              Welcome, <span className="username">{username}</span>!
            </h1>
          </div>
        </header>

        {/* Main Content Section */}
        <div className="row flex-grow-1 d-flex justify-content-center align-items-center">
          <div className="col col-xl-8">
            <div className="card">
              <div className="card-body p-5">
                <form
                  className="d-flex justify-content-center align-items-center mb-4"
                  onSubmit={addTask}
                >
                  <div className="form-outline flex-fill">
                    <input
                      type="text"
                      className="form-control"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                    />
                    <label className="form-label">New task...</label>
                  </div>
                  <button type="submit" className="btn btn-info ms-2">
                    Add
                  </button>
                </form>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <ul className="nav nav-tabs" id="ex1" role="tablist">
                    {tabs.map((tab) => (
                      <li className="nav-item d-flex align-items-center" key={tab}>
                        <button
                          className={`nav-link ${currentTab === tab ? "active" : ""}`}
                          onClick={() => setCurrentTab(tab)}
                        >
                          {tab}
                        </button>
                        {tab !== "All" && tab !== "Active" && tab !== "Completed" && (
                          <button
                            className="btn btn-close ms-2"
                            onClick={() => removeTab(tab)}
                          ></button>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control me-2"
                      value={newTab}
                      onChange={(e) => setNewTab(e.target.value)}
                      placeholder="New category"
                    />
                    <button className="btn btn-primary btn-sm" onClick={addNewTab}>
                      + Add Category
                    </button>
                  </div>
                </div>

                <div className="tab-content" id="ex1-content">
                  <ul className="list-group mb-0">
                    {filteredTasks.map((task) => (
                      <li
                        key={task.id}
                        className="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                        style={{ backgroundColor: "#f4f6f7" }}
                      >
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskStatus(task.id)}
                        />
                        <span
                          style={{
                            textDecoration: task.completed ? "line-through" : "none",
                          }}
                        >
                          {task.title}
                        </span>
                        <button
                          className="btn btn-danger btn-sm ms-auto"
                          onClick={() => removeTask(task.id)}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="footer">
          <p>© 2025 Task Manager. All Rights Reserved.</p>
        </footer>
      </div>
    </section>
  );
}

export default ToDoList;
