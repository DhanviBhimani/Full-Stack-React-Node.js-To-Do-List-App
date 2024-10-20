// src/components/Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import bgImage from '../bg.jpg'; // Update the path to your image

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();

    if (login(username, password)) {
      navigate('/todo'); // Redirect to To-Do List after successful login
    } else {
      setError('Invalid username or password'); // Show error message on failure
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: '80vh', 
      backgroundColor: 'white' 
    }}>
      <div style={{ 
        flex: 1, 
        background: `url(${bgImage}) no-repeat center center/cover`, // Using imported image
      }} />
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        
        padding: '30px',
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          width: '100%', 
          
          marginBottom: '20px' 
        }}>
          
        </div>
        <h2 style={{ 
          color: '#343a40', 
          marginBottom: '20px', 
          
          fontFamily: 'Arial, sans-serif' 
        }}>
          Login
        </h2>
        <form onSubmit={handleLogin} style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          width: '400px', 
          backgroundColor: '#ffffff', 
          padding: '50px', 
          borderRadius: '12px', 
          background: 'linear-gradient(to bottom right, #a8edea, #fed6e3)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)', 
          transition: '0.3s',
          overflow: 'hidden'
        }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ 
              padding: '15px', 
              marginBottom: '15px', 
              borderRadius: '8px', 
              border: '1px solid #ced4da', 
              fontSize: '16px', 
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#ced4da'}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ 
              padding: '15px', 
              marginBottom: '20px', 
              borderRadius: '8px', 
              border: '1px solid #ced4da', 
              fontSize: '16px', 
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#ced4da'}
          />
          <button 
            type="submit" 
            style={{ 
              backgroundColor: '#007bff', 
              color: '#ffffff', 
              padding: '15px', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontSize: '18px', 
              transition: 'background-color 0.2s, transform 0.2s',
              boxShadow: '0 2px 10px rgba(0, 123, 255, 0.3)'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Login
          </button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        <p style={{ marginTop: '20px', color: '#495057' }}>
          Don't have an account? <a href="/signup" style={{ color: '#007bff' }}>Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
