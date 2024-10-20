// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import TodoList from './components/TodoList';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#4A90E2',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          }}>
            Your Tasks, Your Way!
          </h1>

          {/* Move the paragraphs here */}
          <p style={{
            fontSize: '18px',
            color: '#777',
            marginTop: '10px',
          }}>
            Stay organized and never miss a deadline.
          </p>

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/todo" element={<TodoList />} />
            <Route path="/" element={<Login />} /> {/* Default route */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
