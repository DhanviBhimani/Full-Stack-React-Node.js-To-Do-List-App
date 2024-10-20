import React, { useEffect, useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('medium'); // Default priority
  const [dueDate, setDueDate] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [viewingTodo, setViewingTodo] = useState(null); // State for viewing todo
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/todos');
        if (!response.ok) throw new Error('Failed to fetch todos');
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    // Validate task, priority, and due date before proceeding
    if (!task.trim()) {
      alert('Task is required.');
      return;
    }
  
    if (!priority) {
      alert('Priority is required.');
      return;
    }
  
    if (!dueDate) {
      alert('Due date is required.');
      return;
    }
  
    // Prepare the new task object with validated data
    const newTodoData = {
      task: task.trim(),  // Ensure task is not just empty spaces
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,  // Convert due date to ISO string format
      completed: false,
    };
  
    try {
      // Send the new task to the backend API
      const response = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodoData),
      });
  
      if (!response.ok) throw new Error('Failed to add task.');
  
      const newTodo = await response.json();
  
      // Update the todos list in state with the newly added task
      setTodos([...todos, newTodo]);
  
      // Clear input fields after successfully adding a task
      setTask('');
      setPriority('');  // Reset priority to default
      setDueDate('');         // Clear due date
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  

  const updateTodo = async () => {
    if (!task || !editingTodo) return;

    const updatedTodoData = {
      task,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/todos/${editingTodo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodoData),
      });
      if (!response.ok) throw new Error('Failed to update todo');

      const updatedTodo = await response.json();
      setTodos(todos.map(todo => (todo._id === updatedTodo._id ? updatedTodo : todo)));
      setTask('');
      setDueDate('');
      setEditingTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete todo');
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleCompletion = async (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };

    try {
      const response = await fetch(`http://localhost:5000/api/todos/${todo._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: updatedTodo.completed }),
      });

      if (!response.ok) throw new Error('Failed to update completion status');
      const result = await response.json();
      setTodos(todos.map(t => (t._id === result._id ? result : t)));
    } catch (error) {
      console.error('Error updating completion status:', error);
    }
  };

  const viewTodo = (todo) => {
    setViewingTodo(todo); // Set the selected todo to viewing
  };

  const closeView = () => {
    setViewingTodo(null); // Close the view
  };

  const editTodo = (todo) => {
    setEditingTodo(todo._id);
    setTask(todo.task);
    setPriority(todo.priority);
    setDueDate(todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '');
  };

  const filteredTodos = todos.filter(todo =>
    todo.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (todo.completed && searchTerm.toLowerCase() === 'completed') ||
    (todo.priority.toLowerCase() === searchTerm.toLowerCase())
  );

  const sortedTodos = [...filteredTodos];

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      // backgroundColor: 'orange',
      background: 'linear-gradient(to bottom right, #a8edea, #fed6e3)', // Gradient background
      overflow: 'hidden' // Ensure no overflow if using background images
    }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '28px',
        color: '#333',
        marginBottom: '30px',
        textShadow: '1px 1px 2px rgba(255, 255, 255, 0.7)' // Subtle text shadow
      }}>Your To-Do List</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Add a new task" style={{ padding: '10px', flex: '1', border: '2px solid #4A90E2', borderRadius: '4px', marginRight: '10px', fontSize: '16px' }} />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ padding: '10px', border: '2px solid #4A90E2', borderRadius: '4px', marginRight: '10px', fontSize: '16px' }}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={{ padding: '10px', border: '2px solid #4A90E2', borderRadius: '4px', marginRight: '10px' }} />
        {editingTodo ? (
          <button onClick={updateTodo} style={buttonStyle('Update Task')}>
            Update Task
          </button>
        ) : (
          <button onClick={addTodo} style={buttonStyle('Add Task')}>
            Add Task
          </button>
        )}
      </div>

      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search tasks..." style={{ padding: '10px', border: '2px solid #4A90E2', borderRadius: '4px', marginBottom: '20px', width: '96%', fontSize: '16px' }} />

      <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
        {sortedTodos.length > 0 ? (
          sortedTodos.map(todo => (
            <li key={todo._id} style={listItemStyle(todo)}>
              <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                <span style={{ fontSize: '18px', color: '#333' }}>{todo.task}</span>
                <span style={{ fontSize: '14px', color: '#666' }}>Priority: {todo.priority} | Due Date: {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'No due date set'}</span>
              </div>
              <div>
                <button onClick={() => toggleCompletion(todo)} style={toggleButtonStyle(todo)}>
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => editTodo(todo)} style={buttonStyle('Edit')}>
                  Edit
                </button>
                <button onClick={() => viewTodo(todo)} style={buttonStyle('View', 'green')}>
                  View
                </button>
                <button onClick={() => deleteTodo(todo._id)} style={buttonStyle('Delete', '#d9534f')}>
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li style={{ textAlign: 'center', color: '#666' }}>No tasks available</li>
        )}
      </ul>

      {viewingTodo && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '1000'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '400px',
            position: 'relative',
          }}>
            <h3>Viewing Task</h3>
            <p><strong>Task:</strong> {viewingTodo.task}</p>
            <p><strong>Priority:</strong> {viewingTodo.priority}</p>
            <p><strong>Due Date:</strong> {viewingTodo.dueDate ? new Date(viewingTodo.dueDate).toLocaleDateString() : 'No due date set'}</p>
            <button onClick={closeView} style={buttonStyle('Close', 'grey')}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const buttonStyle = (text, backgroundColor = '#4A90E2') => ({
  backgroundColor,
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: '10px 15px',
  marginLeft: '5px',
  cursor: 'pointer',
  fontSize: '16px',
});

const listItemStyle = (todo) => ({
  backgroundColor: todo.completed ? '#e9ffe9' : '#fff',
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const toggleButtonStyle = (todo) => ({
  backgroundColor: todo.completed ? '#d9534f' : '#5bc0de',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: '10px 15px',
  marginLeft: '5px',
  cursor: 'pointer',
  fontSize: '16px',
});

export default TodoList;
