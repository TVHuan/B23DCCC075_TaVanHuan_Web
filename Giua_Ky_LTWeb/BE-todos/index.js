//index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); //cấu hình CORS trên server của mình để cho phép yêu cầu từ domain khác
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', taskRoutes);

const PORT = process.env.PORT ||5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


app.use(cors());
