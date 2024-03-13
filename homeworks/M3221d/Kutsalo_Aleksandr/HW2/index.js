const express = require('express')
const users = require('./routes/user');
const port = 8888
const app = express()
app.use(express.json());

app.use('/', users);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})