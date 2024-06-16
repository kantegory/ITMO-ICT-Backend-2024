const db = require("../models");

exports.createUser = async (req, res) => {
    try {
        const newUser = await db.User.create(req.body);
        return res.status(201).json(newUser);
      } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    
}

exports.getUserById = async (req, res) => {
    console.log("here");
    const user = await db.User.findByPk(req.params.id);
    if (user) {
        return res.send(user);
    };
    return res.status(404).send({ message: `User with id of ${req.params.id} is not found` });
}

exports.updateUserById = async (req, res) => {
    const user = await db.User.findByPk(req.params.id);
    if (!user) {
        return res.status(404).send({ message: `User with id of ${req.params.id} is not found` });
    };

    try {
        const updatedUser = await user.update(req.body);
        return res.send(updatedUser);
    } catch (e) {
        return res.status(500).json({ message: error.message });
    };
}
exports.deleteUserById = async (req, res) => {
    const user = await db.User.destroy({
        where: {
            id: req.params.id
        }
    });
    if (user) {
        return res.send({ message: `User with id ${req.params.id} is deleted` })
    };
    return res.status(404).send({ message: `User with id of ${req.params.id} is not found` })
}

// Convenient for test
exports.getUsers = async (req, res) => {
    const users = await db.User.findAll();
    return res.send(users)
}