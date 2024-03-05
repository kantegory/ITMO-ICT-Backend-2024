const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/users', UserController.createUser);

router.get('/users/:idOrEmail', UserController.getUserByIdOrEmail);

router.get('/users', UserController.getAllUser);

router.delete('/users/:idOrEmail', UserController.deleteUserByIdOrEmail);

router.put('/users/:idOrEmail', UserController.updateUserByIdOrEmail);

module.exports = router;
