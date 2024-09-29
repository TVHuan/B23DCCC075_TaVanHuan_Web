import React from 'react';
import TodoItem from './ToDoItem';

function TodoList({ congViec, xoaCongViec, danhDauHoanThanh }) {
  return (
    <ul className="task-list">
      {congViec.map((task, index) => (
        <TodoItem
          key={index}
          task={task}
          xoaCongViec={() => xoaCongViec(index)}
          danhDauHoanThanh={() => danhDauHoanThanh(index)}
        />
      ))}
    </ul>
  );
}

export default TodoList;
