import React from 'react';

function TodoItem({ task, xoaCongViec, danhDauHoanThanh }) {
  return (
    <li className="task-item">
      <div>
        <span className={`task-text ${task.daHoanThanh ? 'completed' : ''}`}>
          {task.text}
        </span>
        <span className="task-date-display">
          {task.ngayLam ? `Ngày: ${task.ngayLam}` : ''}
        </span>
      </div>
      <div className="task-actions">
        <button onClick={danhDauHoanThanh} className="complete-btn">
          {task.daHoanThanh ? 'Đã Hoàn Thành' : '✓'}
        </button>
        <button onClick={xoaCongViec} className="delete-btn">X</button>
      </div>
    </li>
  );
}

export default TodoItem;