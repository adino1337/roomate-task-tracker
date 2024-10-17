import React from 'react';
import TaskEntry from './TaskEntry';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WeeklySchedule = ({ tasks, addTask }) => {
  return (
    <div>
      {daysOfWeek.map((day) => (
        <div key={day}>
          <h3>{day}</h3>
          <ul>
            {tasks.filter(task => task.day === day).map((task, index) => (
              <li key={index}>{task.user}: {task.description} ({task.points} points)</li>
            ))}
          </ul>
          <TaskEntry day={day} addTask={addTask} />
        </div>
      ))}
    </div>
  );
};

export default WeeklySchedule;
