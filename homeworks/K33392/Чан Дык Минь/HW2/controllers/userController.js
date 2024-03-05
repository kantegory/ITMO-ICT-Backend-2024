const User = require('../User')

exports.findById = async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (user) {
        return res.send(user.toJSON());
    }
    return res.status(404).send("User could not be found");
}

exports.findByEmail = async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.params.email
        }
    });;
    
    if (user) {
        return res.send(user.toJSON());
    }
    return res.status(404).send("User could not be found");
}

exports.deleteById = async (req, res) => {
    await User.destroy({
        where: {
            id: req.params.id
        }
    });
    res.send("User has been deleted successfully!")
}

exports.findAll = async (req, res) => {
    const users = await User.findAll();
    return res.status(200).send(users.map(u => u.toJSON()));
}

exports.create = async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).send(user.toJSON());
    } catch (e) {
        return res.status(400).send(e.errors.map(err => err.message));
    }
}

exports.update = async (req, res) => {
    const userId = req.params.id;
    const payload = req.body;

    const user = await User.findByPk(userId);
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