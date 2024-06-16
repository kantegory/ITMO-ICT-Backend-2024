const express = require('express')
const users = require('./routes/users');

const app = express()
app.use(express.json());

const port = 3000

app.use('/api/users', users);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})