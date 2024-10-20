// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]); // Store registered users

  const login = (username, password) => {
    // Example credentials (you can modify this as needed)
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setIsAuthenticated(true);
      return true; // Return true if login is successful
    }
    return false; // Return false if login fails
  };

  const signup = (username, password) => {
    // Check if user already exists
    if (users.find(user => user.username === username)) {
      return false; // User already exists
    }
    // Add new user to the list
    setUsers(prevUsers => [...prevUsers, { username, password }]);
    return true; // Return true if signup is successful
  };

  return (
    <AuthContext.Provider value={{ login, signup, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
