const express = require('express');
const router = express.Router();
const User = require('../controllers/user');

router.post('/', User.createUser);
router.get('/', User.getUsers);
router.get('/:id', User.getUser);
router.patch('/:id', User.updateUser);
router.delete('/:id', User.deleteUser);

module.exports = router;