import React from 'react';
// import Task from './Task';
import { useEffect, useState } from 'react';
const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/todos');
        const data = await response.json();
        setTasks(data); // Update state with the fetched tasks
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks(); // Fetch tasks when the component loads
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id}>{task.task}</div>
      ))}
    </div>
  );
};

export default TaskList;