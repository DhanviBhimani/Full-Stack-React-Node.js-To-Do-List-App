// services/authService.js

const API_URL = 'http://localhost:5000/api/auth'; // Update with your API URL

export const signup = async (userData) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to sign up');
  }
  
  return response.json();
};

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Failed to log in');
  }

  return response.json();
};

export const logout = async () => {
  // You can add logout functionality here if needed, such as clearing tokens from localStorage
  localStorage.removeItem('token');
};
