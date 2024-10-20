// utils/validation.js

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  export const validateRequired = (value) => {
    return value.trim() !== '';
  };
  
  export const validateTask = (task) => {
    return validateRequired(task.title) && validateRequired(task.description);
  };
  
  export const validateSignup = (userData) => {
    return (
      validateRequired(userData.username) &&
      validateEmail(userData.email) &&
      validateRequired(userData.password)
    );
  };
  
  export const validateLogin = (credentials) => {
    return (
      validateRequired(credentials.email) &&
      validateRequired(credentials.password)
    );
  };
  