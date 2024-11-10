//taskController.js
const db = require('../configs/db');

// Lấy danh sách task
exports.getTasks = (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

// Thêm task mới
exports.createTask = (req, res) => {
  const { title, name, description, due_date } = req.body; 
  if (!title || !name || !description || !due_date) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const query = 'INSERT INTO tasks (name, title, description, due_date) VALUES (?, ?, ?, ?)';
  db.query(query, [name, title, description, due_date], (err, results) => {
    if (err) {return res.status(500).json({ message: 'Database error', error: err.message })}
    res.json({ id: results.insertId, name, title, description, due_date, isCompleted: false });
  });
};


// Cập nhật task
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, name, description, due_date } = req.body;

  // Kiểm tra tồn tại
  db.query('SELECT * FROM tasks WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Cập nhật task nếu tồn tại
    db.query(
      'UPDATE tasks SET title = ?, name = ?, description = ?, due_date = ? WHERE id = ?',
      [title, name, description, due_date, id],
      (err) => {
        if (err) {
          return res.status(500).json({ message: 'Failed to update task', error: err });
        }
        res.json({ id, title, name, description, due_date });
      }
    );
  });
};


// Xóa task
exports.deleteTask = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: "Task deleted" });
  });
};

// Cập nhật trạng thái hoàn thành
exports.updateTaskStatus = (req, res) => {
  const { id } = req.params;
  db.query('UPDATE tasks SET isCompleted = NOT isCompleted WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ id, statusUpdated: true });
  });
};
