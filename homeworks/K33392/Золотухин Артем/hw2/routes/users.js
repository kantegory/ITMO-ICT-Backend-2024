const express = require('express')
const router = express.Router()
const { User } = require('../models')
const { Op } = require('sequelize')

router.post('/', async (req, res) => {
  try {
    let user = undefined
    if (req.body) {
      user = await User.create(req.body)
    } else {
      user = await User.create({
        email: 'artem.zolotukhin.303@gmail.com',
        name: 'Artem',
        password: '110100zz',
      })
    }
    res.json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll()
    res.send(users)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          [Op.or]: [{ id: req.params.id }, { email: req.params.id }],
        },
      })
      if (user) {
        res.json(user)
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  })
  .put(async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id)
      if (user) {
        await user.update(req.body)
        res.json(user)
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  })
  .delete(async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id)
      if (user) {
        await user.destroy()
        res.status(204).send()
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  })

module.exports = router
