// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 5000;
const DATA_FILE = './tasks.json';

// Middleware
app.use(bodyParser.json());

// Serve static files from the React app's build folder
app.use(express.static(path.join(__dirname, 'build')));

// Použij CORS middleware
app.use(cors({
  origin: '*', // Nebo specifikuj 'http://localhost' pokud chceš povolit jen z konkrétního místa
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
// Helper function to read tasks from file
const readTasksFromFile = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    if (!data) {
      return [];
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading tasks file:', err);
    return [];
  }
};

// Helper function to write tasks to file
const writeTasksToFile = (tasks) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error('Error writing tasks file:', err);
  }
};

// Get all tasks
app.get('/api/tasks', (req, res) => {
  const tasks = readTasksFromFile();
  res.json(tasks);
});

// Add a new task
app.post('/api/tasks', (req, res) => {
  const tasks = readTasksFromFile();
  const newTask = req.body;
  tasks.push(newTask);
  writeTasksToFile(tasks);
  res.status(201).json(newTask);

  // Emit an event to update all connected clients
  io.emit('taskUpdated', tasks);
});

// Delete a task
app.delete('/api/tasks/:index', (req, res) => {
  const tasks = readTasksFromFile();
  const index = parseInt(req.params.index, 10);
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    writeTasksToFile(tasks);
    res.status(200).json({ message: 'Task deleted successfully' });

    // Emit an event to update all connected clients
    io.emit('taskUpdated', tasks);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Serve the React app for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server with Socket.IO
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
