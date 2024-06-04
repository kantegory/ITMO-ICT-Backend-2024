const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userControl');

// создание
router.post('/create', UserController.createUser);

// получение всех 
router.get('/', UserController.getAllUsers);

// получение по ID
router.get('/:id', UserController.getUserById);

// обновление
router.put('/:id', UserController.updateUser);

// удаление
router.delete('/:id', UserController.deleteUser);

//по email
router.get('/email/:email', UserController.getUserByEmail);

module.exports = router;
