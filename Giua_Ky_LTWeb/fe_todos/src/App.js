import React, { useEffect, useState } from "react";
import { Button } from "antd";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null); // Để lưu trữ công việc cần sửa

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        task
      );
      setTasks([...tasks, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (task) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${task.id}`, task);

      // Tải lại tất cả công việc từ server để đảm bảo dữ liệu mới nhất
      fetchTasks();

      setShowForm(false);
      setEditTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleAddTaskClick = () => {
    setEditTask(null);
    setShowForm(true);
  };

  return (
    <div className="app-container">
      <h1>My Work 🎯</h1>
      <Button type="primary" onClick={handleAddTaskClick}>
        Add Task
      </Button>
      {showForm && (
        <TaskForm
          onSubmit={editTask ? updateTask : addTask}
          editTask={editTask}
          setShowForm={setShowForm}
        />
      )}
      <TaskList
        tasks={tasks}
        fetchTasks={fetchTasks}
        setEditTask={setEditTask}
        setShowForm={setShowForm}
      />
    </div>
  );
}

export default App;
