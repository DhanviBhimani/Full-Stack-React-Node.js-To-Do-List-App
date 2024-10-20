import React from 'react';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Welcome, {user ? user.email : 'Guest'}</h2>
      <AddTaskForm />
      <TaskList />
    </div>
  );
};

export default Home;
