import React, { useState } from 'react';

const AddTask = ({ setTasks }) => {
  const [newTask, setNewTask] = useState('');

  const addTask = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: newTask }),
      });
      const data = await response.json();
      setTasks((prevTasks) => [...prevTasks, data]); // Update the state with the new task
      setNewTask(''); // Clear the input
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default AddTask;
