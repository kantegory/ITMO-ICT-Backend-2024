const express = require('express');
const db = require('../models')

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const router = express.Router();

/** INDEX */
router.get('/', async (req, res) => {
    const users = await db.User.findAll()
    const mappedUsers = users.map(u => ({
        id: u.id,
        name: u.fullName,
        email: u.email,
    }))
    res.json(mappedUsers)
});

/** FIND */
router.get('/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)
    if (!user) {
        return res.status(404).json({detail: 'User is not found'})
    }
    return res.json(user.toJSON())
});

/** STORE */
router.post('/',[
    body('first_name').notEmpty().isString(),
    body('last_name').notEmpty().isString(),
    body('patronymic').custom(val => val == null || typeof val === 'string'),
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isString().isLength({ min: 8 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const user = await db.User.create({
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        patronymic: req.body.patronymic,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10)
    });

    return res.status(201).json(user.toJSON());
});

/** UPDATE */
router.put('/:id',[
    body('first_name').notEmpty().isString(),
    body('last_name').notEmpty().isString(),
    body('patronymic').isString(),
    body('email').notEmpty().isEmail()
], async (req, res) => {
    const user = await db.User.findByPk(req.params.id)
    if (!user) {
        return res.status(404).json({detail: 'User is not found'})
    }
    user.first_name = req.body.first_name
    user.last_name = req.body.last_name
    user.patronymic = req.body.patronymic
    await user.save()
    res.json(user.toJSON())
});

/** DESTROY */
router.delete('/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)
    if (!user) {
        return res.status(404).json({detail: 'User is not found'})
    }
    await user.destroy();
    res.json({ detail: 'User deleted successfully' });
});

module.exports = {prefix: '/users', router: router}