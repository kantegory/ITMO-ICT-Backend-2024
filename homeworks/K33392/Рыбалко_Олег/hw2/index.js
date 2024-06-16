const express = require('express')
const db = require('./models')
const app = express()

// Create a new user
app.post('/users', async (req, res) => {
  try {
    const user = await db.User.create(req.body)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Get all users
app.get('/users', async (req, res) => {
  try {
    res.json(await db.User.findAll())
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
    } else {
      res.json(user)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update user by ID
app.patch('/users/:id', async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
    } else {
      await user.update(req.body)
      res.json(user)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
    } else {
      await user.destroy()
      res.status(200).send()
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(9090, () => {
  console.log('listening on port 9090')
})

