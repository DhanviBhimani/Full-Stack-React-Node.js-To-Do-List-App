const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'] }, // Validate priority
  dueDate: { type: Date, default: null },  // Accept due date
  completed: { type: Boolean, default: false },
  
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
