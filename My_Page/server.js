const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();  // 用于从 .env 文件加载环境变量

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 从环境变量加载 MongoDB Atlas 连接 URI
const mongoURI = process.env.MONGO_URI;

// 连接到 MongoDB Atlas 数据库
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

// 定义留言的 Schema 和 Model
const messageSchema = new mongoose.Schema({
  name: String,
  content: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// 获取所有留言
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 保存新的留言
app.post('/messages', async (req, res) => {
  const message = new Message({
    name: req.body.name,
    content: req.body.content
  });

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 删除留言
app.delete('/messages/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    await message.remove();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 启动服务器
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
