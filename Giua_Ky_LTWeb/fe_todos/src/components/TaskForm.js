import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import "../App.css";

function TaskForm({ onSubmit, editTask, setShowForm }) {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setName(editTask.name);
      setDescription(editTask.description);
      setDueDate(editTask.due_date);
    } else {
      // Reset form khi không có task để sửa
      setTitle("");
      setName("");
      setDescription("");
      setDueDate("");
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && name && description && dueDate) {
      const taskData = {
        title,
        name,
        description,
        due_date: dueDate,
        id: editTask ? editTask.id : null,
      };
      onSubmit(taskData);
      setTitle("");
      setName("");
      setDescription("");
      setDueDate("");
      setShowForm(false);
    } else {
      alert("Please fill out all fields");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div>
      <Modal
        title={editTask ? "Edit Task" : "Add New Task"}
        visible={true}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleSubmit} className="task-form">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <div className="modal-footer">
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default TaskForm;
