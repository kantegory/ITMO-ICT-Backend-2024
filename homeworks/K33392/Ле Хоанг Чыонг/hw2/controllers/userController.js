const db = require('../models');
const { Op } = require('sequelize');
exports.createUser = async (req, res) => {
    try {
        const { lastName,firstName, email, password } = req.body;
        const newUser = await db.User.create({ lastName,firstName, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserByIdOrEmail = async (req, res) => {
    try {
        const { idOrEmail } = req.params;
        const user = await db.User.findOne({
            where: {
                [Op.or]: [{ id: idOrEmail }, { email: idOrEmail }]
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAllUser = async (req, res) => {
    try { 
        const user = await db.User.findAll()
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteUserByIdOrEmail = async (req, res) => {
    try {
        const { idOrEmail } = req.params;
        const user = await db.User.destroy({
            where: {
                [Op.or]: [{ id: idOrEmail }, { email: idOrEmail }]
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.send({'status_code': 'User deleted'})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserByIdOrEmail = async (req, res) => {
    try {
        const { idOrEmail } = req.params;
        const user = await db.User.update(req.body,{
            where: {
                [Op.or]: [{ id: idOrEmail }, { email: idOrEmail }]
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.send({'status_code': 'User updated'})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};