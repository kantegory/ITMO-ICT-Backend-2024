const db = require('../../models');
const {ValidationError} = require("sequelize");

exports.findById = async (req, res) => {
    const user = await db.User.findByPk(req.params.id);

    await db.User.findOne({
        where: {
            id: 1,
            email: "email@email.co.uk"
        }
    })

    if (user) {
        return res.send(user.toJSON());
    }

    return res.status(404).send("User could not be found");
}

exports.deleteById = async (req, res) => {
    await db.User.destroy({
        where: {
            id: req.params.id
        }
    });

    return res.status(204).send();
}

exports.findAll = async (req, res) => {
    const users = await db.User.findAll();
    return res.status(200).send(users.map(u => u.toJSON()));
}

exports.create = async (req, res) => {
    try {
        const user = await db.User.create(req.body);
        return res.status(201).send(user.toJSON());
    } catch (e) {
        return res.status(400).send(e.errors.map(err => err.message));
    }
}

exports.update = async (req, res) => {
    const userId = req.params.id;
    const payload = req.body;

    const user = await db.User.findByPk(userId);
    if (!user) {
        return res.status(404).send("User could not be found");
    }

    try {
        const updatedUser = await user.update(payload);
        return res.send(updatedUser.toJSON());
    } catch (e) {
        return res.status(400).send(e.errors.map(err => err.message));
    }
}