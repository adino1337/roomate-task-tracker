import React, { useState, useEffect } from 'react';
import './App.css';
import TaskMatrix from './TaskMatrix';
import TaskDialog from './TaskDialog';
import axios from 'axios';
import { io } from 'socket.io-client';
import { roommates, daysOfWeek, predefinedTasks } from './conf';

const socket = io('http://192.168.0.91:5000'); // Update with the backend server address

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
      const response = await axios.get('http://192.168.0.91:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (task) => {
    try {
      await axios.post('http://192.168.0.91:5000/tasks', { ...task, day: selectedCell.day, user: selectedCell.user });
      setSelectedCell(null);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const removeTask = async (taskToRemoveIndex) => {
    try {
      await axios.delete(`http://192.168.0.91:5000/tasks/${taskToRemoveIndex}`);
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
