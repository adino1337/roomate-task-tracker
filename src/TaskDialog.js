// TaskDialog.js
import React, { useState, useEffect, useRef } from 'react';

const TaskDialog = ({ predefinedTasks, addTask, closeTaskDialog }) => {
  const [openCategory, setOpenCategory] = useState(null);
  const dialogRef = useRef(null);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const handleAddTask = (task) => {
    addTask(task);
    closeTaskDialog(); // Close dialog after adding the task
  };

  // Close dialog on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        closeTaskDialog();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeTaskDialog]);

  return (
    <div className="overlay">
      <div className="task-dialog" ref={dialogRef}>
        <div className="dialog-header">
          <h2>Pridať úlohu</h2>
          <button className="close-button" onClick={closeTaskDialog}>
            X
          </button>
        </div>
        {predefinedTasks.map((category) => (
          <div key={category.category}>
            <button 
              className="category-button"
              onClick={() => toggleCategory(category.category)}
            >
              {category.category}
            </button>
            {openCategory === category.category && (
              <div className="task-buttons">
                {category.tasks.map((task) => (
                  <button
                    key={task.name}
                    className="task-button"
                    onClick={() => handleAddTask(task)}
                  >
                    {task.name} ({task.points} bodov)
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskDialog;
