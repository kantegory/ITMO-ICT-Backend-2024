const express = require('express');
const router = express.Router();

const user = require("../controllers/user");
console.log("at routes");
router.post('/users/', user.createUser);
router.get('/users/:id', user.getUserById);
router.put('/users/:id', user.updateUserById);
router.delete('/users/:id', user.deleteUserById);
router.get('/users/', user.getUsers);
module.exports = router;