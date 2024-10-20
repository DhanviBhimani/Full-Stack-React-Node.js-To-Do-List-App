const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS package
const bodyParser = require('body-parser');
const Todo = require('./models/Todo'); // Assuming you have a Todo model

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/todoapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

connectDB();

// Routes

// Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Add a new todo
app.post('/api/todos', async (req, res) => {
  try {
    const newTodo = new Todo({
      task: req.body.task,
      completed: false, // Set default completion status
    });

    const savedTodo = await newTodo.save();
    res.json(savedTodo); // Return the saved task as a response
  } catch (error) {
    res.status(500).json({ error: 'Failed to add task' });
  }
});

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Update a todo
app.put('/api/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo', error });
  }
});


// Route to toggle completion status
app.put('/api/todos/:id/complete', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).send('Todo not found');

    // Toggle the completed status
    todo.completed = !todo.completed;
    await todo.save(); // Save the updated todo

    res.json(todo); // Respond with the updated todo
  } catch (error) {
    console.error('Error toggling completion status:', error);
    res.status(500).send('Server error');
  }
});

// Route to toggle pin status
app.put('/api/todos/:id/pin', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).send('Todo not found');

    // Toggle the pinned status
    todo.pinned = !todo.pinned;
    await todo.save(); // Save the updated todo

    res.json(todo); // Respond with the updated todo
  } catch (error) {
    console.error('Error toggling pin status:', error);
    res.status(500).send('Server error');
  }
});
app.post('/api/todos', async (req, res) => {
  try {
    const newTodo = new Todo({
      task: req.body.task,
      priority: req.body.priority,
      dueDate: req.body.dueDate,
    });

    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add task' });
  }
});
app.put('/api/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        task: req.body.task,
        priority: req.body.priority,
        dueDate: req.body.dueDate,
      },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
