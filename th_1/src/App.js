import React, { useState } from 'react';
import TodoList from './components/ToDoList';
import './App.css';

function TodoApp() {
  const [congViec, setCongViec] = useState([]);
  const [congViecMoi, setCongViecMoi] = useState('');
  const [ngayLam, setNgayLam] = useState('');

  const themCongViec = (e) => {
    e.preventDefault();
    if (congViecMoi.trim() && ngayLam) {
      setCongViec([...congViec, { text: congViecMoi, ngayLam: ngayLam, daHoanThanh: false }]);
      setCongViecMoi('');
      setNgayLam(''); 
    }
  };

  const xoaCongViec = (index) => {
    const congViecCapNhat = congViec.filter((task, i) => i !== index);
    setCongViec(congViecCapNhat);
  };

  const danhDauHoanThanh = (index) => {
    const congViecCapNhat = congViec.map((task, i) =>
      i === index ? { ...task, daHoanThanh: !task.daHoanThanh } : task
    );
    setCongViec(congViecCapNhat);
  };

  return (
    <div className="todo-app">
      <div className="todo-container">
        <h1 className="title">Công Việc Của Bạn</h1>
        <form onSubmit={themCongViec} className="task-form">
          <input
            type="text"
            placeholder="Nhập công việc..."
            value={congViecMoi}
            onChange={(e) => setCongViecMoi(e.target.value)}
            className="task-input"
          />
          <input
            type="date"
            value={ngayLam}
            onChange={(e) => setNgayLam(e.target.value)}
            className="task-date"
          />
          <button type="submit" className="add-btn">+</button>
        </form>
        <TodoList congViec={congViec} xoaCongViec={xoaCongViec} danhDauHoanThanh={danhDauHoanThanh} />
      </div>
    </div>
  );
}

export default TodoApp;