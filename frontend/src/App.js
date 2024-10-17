import React, { useState, useEffect } from 'react';
import './App.css';
import TaskMatrix from './TaskMatrix';
import TaskDialog from './TaskDialog';
import axios from 'axios';
import { io } from 'socket.io-client';
import { roommates, daysOfWeek, predefinedTasks } from './conf';

const socket = io(); // Use relative path for WebSocket connection

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);

  useEffect(() => {
    fetchTasks();

    // Listen for real-time task updates
    socket.on('taskUpdated', (updatedTasks) => {
      setTasks(updatedTasks);
    });

    return () => {
      // Clean up the socket connection
      socket.off('taskUpdated');
    };
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks'); // Use relative path for API requests
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (task) => {
    try {
      await axios.post('/api/tasks', { ...task, day: selectedCell.day, user: selectedCell.user }); // Use relative path
      setSelectedCell(null);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const removeTask = async (taskToRemoveIndex) => {
    try {
      await axios.delete(`/api/tasks/${taskToRemoveIndex}`); // Use relative path
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  const openTaskDialog = (day, user) => {
    setSelectedCell({ day, user });
  };

  const closeTaskDialog = () => {
    setSelectedCell(null);
  };

  return (
    <div>
      <TaskMatrix 
        roommates={roommates} 
        daysOfWeek={daysOfWeek} 
        tasks={tasks} 
        openTaskDialog={openTaskDialog} 
        removeTask={(task) => removeTask(tasks.indexOf(task))} 
      />
      {selectedCell && 
        <TaskDialog 
          predefinedTasks={predefinedTasks} 
          addTask={addTask} 
          closeTaskDialog={closeTaskDialog} 
        />
      }
    </div>
  );
};

export default App;
