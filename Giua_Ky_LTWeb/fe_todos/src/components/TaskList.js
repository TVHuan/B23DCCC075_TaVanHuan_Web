import React from "react";
import { Checkbox } from "antd";
import axios from "axios";
import "../App.css";

function TaskList({ tasks, fetchTasks, setEditTask, setShowForm }) {
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleTaskStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${id}/status`, {
        isCompleted: status,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const onChange = (taskId, e) => {
    toggleTaskStatus(taskId, e.target.checked);
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task-item ${task.isCompleted ? "completed" : ""}`}
        >
          <h3>Name: {task.name}</h3>
          <p>Title: {task.title}</p>
          <p>Description: {task.description}</p>
          <p>Due Date: {task.due_date}</p>
          <Checkbox
            checked={task.isCompleted}
            onChange={(e) => onChange(task.id, e)}
          >
            {task.isCompleted ? "Đã Hoàn thành" : "Chưa Hoàn thành"}
          </Checkbox>

          <button
            onClick={() => {
              setEditTask(task);
              setShowForm(true);
            }}
          >
            Edit
          </button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
