const db = require('../models');

exports.createUser = async (req, res) => {
    try {
        const user = await db.User.create(req.body);
        return res.status(201).send(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getUsers = async (req, res) => {
    const users = await db.User.findAll()
    return res.send(users)
}

exports.getUser = async (req, res) => {
    const user = await db.User.findByPk(req.params.id)
    if (user) {
        return res.send(user)
    }
    return res.status(404).send({ message: "user is not found" })
}

exports.updateUser = async (req, res) => {
    const user = await db.User.findByPk(req.params.id);
    if (!user) {
        return res.status(404).send({ message: "user is not found" });
    }

    try {
        const updatedUser = await user.update(req.body);
        return res.send(updatedUser);
    } catch (e) {
        return res.status(500).json({ message: error.message });
    }
}

exports.deleteUser = async (req, res) => {
    const user = await db.User.destroy({
        where: {
            id: req.params.id
        }
    });
    if (user) {
        return res.send({ message: "user deleted" })
    }
    return res.status(404).send({ message: "user is not found" })
}