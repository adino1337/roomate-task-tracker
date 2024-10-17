import React from 'react';

const TaskMatrix = ({ roommates, daysOfWeek, tasks, openTaskDialog, removeTask }) => {
  const calculateTotalPoints = (user) => {
    return tasks
      .filter(task => task.user === user)
      .reduce((total, task) => total + task.points, 0);
  };

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {daysOfWeek.map((day) => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {roommates.map((user, userIndex) => (
          <tr key={user}>
            <td>
              {user}
              <div className="total-points">Total Points: {calculateTotalPoints(userIndex)}</div>
            </td>
            {daysOfWeek.map((day) => (
              <td 
                key={day} 
                onClick={() => openTaskDialog(day, userIndex)}
                className="task-cell"
              >
                <div className="task-list">
                  {tasks
                    .filter(task => task.day === day && task.user === userIndex)
                    .map((task, index) => (
                      <div 
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent opening the dialog when removing a task
                          removeTask(task);
                        }}
                      >
                        {task.name} ({task.points} body)
                      </div>
                    ))}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskMatrix;
