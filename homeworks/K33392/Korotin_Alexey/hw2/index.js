const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/users/userController');

const app = express();
app.use(bodyParser.json());
const port = 3000;

app.get("/users", userController.findAll);
app.get("/users/:id", userController.findById);
app.delete("/users/:id", userController.deleteById);
app.post("/users", userController.create);
app.patch("/users/:id", userController.update);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})