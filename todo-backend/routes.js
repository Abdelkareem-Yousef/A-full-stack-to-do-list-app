const express = require('express')
const router = express.Router()
const pool = require('./db')

// GET all tasks
router.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ADD a task
router.post('/tasks', async (req, res) => {
  try {
    const { text, priority, dueDate } = req.body
    const result = await pool.query(
      'INSERT INTO tasks (text, priority, due_date) VALUES ($1, $2, $3) RETURNING *',
      [text, priority, dueDate || null]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// TOGGLE complete
router.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { completed } = req.body
    const result = await pool.query(
      'UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *',
      [completed, id]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM tasks WHERE id = $1', [id])
    res.json({ message: 'Task deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// EDIT a task
router.put('/tasks/edit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { text, priority, dueDate } = req.body
    const result = await pool.query(
      'UPDATE tasks SET text = $1, priority = $2, due_date = $3 WHERE id = $4 RETURNING *',
      [text, priority, dueDate || null, id]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router