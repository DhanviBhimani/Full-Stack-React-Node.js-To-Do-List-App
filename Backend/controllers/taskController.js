const Todo = require('../models/Todo'); // Assuming you have a Todo model

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const todos = await Todo.find(); // Fetch all todos
        res.json(todos); // Send todos as JSON
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks', error });
    }
};

const Todo = require('./models/Todo');  // Import your model

app.post('/api/todos', async (req, res) => {
  const { task, priority, dueDate, completed, pinned } = req.body;
  
  try {
    const newTodo = new Todo({
      task,
      priority: priority || 'medium',  // Assign the priority from the request or default to medium
      dueDate: dueDate ? new Date(dueDate) : null,  // Assign the dueDate from the request or set to null
      completed: completed || false,
      pinned: pinned || false
    });

    const savedTodo = await newTodo.save();
    res.json(savedTodo);  // Send the saved todo as a response
  } catch (error) {
    res.status(500).send('Error creating todo');
  }
});

// Create a new task
const createTask = async (req, res) => {
    const { task, priority, dueDate } = req.body; // Destructure the incoming data

    try {
        // Log the incoming data for debugging
        console.log('New todo data being sent:', req.body);

        // Create a new task with the provided data
        const newTodo = new Todo({
            task,
            priority: priority || 'medium', // Set default priority if not provided
            dueDate: dueDate ? new Date(dueDate) : null // Convert to Date if provided
        });

        await newTodo.save(); // Save to database
        console.log('Added todo:', newTodo); // Log the newly created task

        res.status(201).json(newTodo); // Send the created task as response
    } catch (error) {
        console.error('Error creating task:', error); // Log any error
        res.status(500).json({ message: 'Failed to create task', error });
    }
};


// Update an existing task
const updateTask = async (req, res) => {
    const { task, priority, dueDate } = req.body; // Get data from the request

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { task, priority, dueDate: dueDate ? new Date(dueDate) : null }, // Update the task, priority, and due date
            { new: true } // Return the updated document
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(updatedTodo); // Return the updated task
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task', error });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id); // Delete task by ID

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' }); // Return success message
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task', error });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};
