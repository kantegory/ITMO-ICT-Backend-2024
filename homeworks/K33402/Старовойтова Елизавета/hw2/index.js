const express = require('express')
const db = require('./models')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());

const port = 3339

// Create new user
app.post('/users', async (req, res) => {
  try {
    const user = await db.User.create(req.body)
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

// Get users
app.get('/users', async (req, res) => {
  try {
    const users = await db.User.findAll();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Update user
app.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const [updated] = await db.User.update(req.body, {
      where: { id: userId }
    });
    if (updated) {
      const updatedUser = await db.User.findByPk(userId);
      return res.json(updatedUser);
    }
    throw new Error('User not found');
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

// Delete user
app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await db.User.destroy({
      where: { id: userId }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

