import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/api';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const tasksFromAPI = await fetchTasks();
    setTasks(tasksFromAPI);
  };

  const addTask = async (task) => {
    const newTask = await createTask(task);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const editTask = async (id, updatedTask) => {
    const editedTask = await updateTask(id, updatedTask);
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? editedTask : task)));
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};
