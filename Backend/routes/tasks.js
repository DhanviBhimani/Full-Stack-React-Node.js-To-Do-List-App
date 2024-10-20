const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware); // Protect all task routes
router.get('/', getTasks);  // Public route, no auth required
router.post('/', authMiddleware, createTask);  // Protected
router.put('/:id', authMiddleware, updateTask);  // Protected
router.delete('/:id', authMiddleware, deleteTask);  // Protected

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { task, priority, dueDate, completed } = req.body;
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { task, priority, dueDate, completed },
        { new: true }
      );
      if (!updatedTask) return res.status(404).send('Task not found');
      res.json(updatedTask);
    } catch (error) {
      res.status(500).send('Error updating task');
    }
  });
  const { check, validationResult } = require('express-validator');

router.post(
  '/',
  [
    check('task').notEmpty().withMessage('Task is required'),
    check('priority').isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
    check('dueDate').optional().isISO8601().toDate().withMessage('Invalid due date')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createTask
);

  

module.exports = router;
