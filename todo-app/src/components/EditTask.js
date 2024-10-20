import React, { useState } from 'react';

const EditTask = ({ task, setTasks }) => {
    const [updatedTask, setUpdatedTask] = useState(task.task);
  
    const updateTask = async (id) => {
      try {
        const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ task: updatedTask }),
        });
        const data = await response.json();
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t._id === id ? data : t))
        ); // Update the task in state
      } catch (error) {
        console.error('Error updating task:', error);
      }
    };
  
    return (
      <div>
        <input
          type="text"
          value={updatedTask}
          onChange={(e) => setUpdatedTask(e.target.value)}
        />
        <button onClick={() => updateTask(task._id)}>Update Task</button>
      </div>
    );
  };
  
  export default EditTask;
  