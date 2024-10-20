import React from 'react';

const TaskItem = ({ task, setTasks }) => {
  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'DELETE',
      });
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== id)); // Update state to remove deleted task
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <span>{task.task}</span>
      <button onClick={() => deleteTask(task._id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
