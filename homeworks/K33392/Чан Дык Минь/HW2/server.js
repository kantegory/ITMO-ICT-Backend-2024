const express = require('express');
const sequelize = require('./database');
const userController = require('./controllers/userController');

sequelize.sync().then(() => console.log('db is ready'));

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/users", userController.findAll);
app.get("/users/:id", userController.findById);
app.get("/users/email/:email", userController.findByEmail);
app.delete("/users/:id", userController.deleteById);
app.post("/users", userController.create);
app.patch("/users/:id", userController.update);

app.listen(4000, () => {
    console.log("Server running")
})