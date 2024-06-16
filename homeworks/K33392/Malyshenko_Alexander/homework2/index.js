const express = require('express')
const db = require('./models')
const app = express()
const port = 3000
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})


// get users
app.get('/users', async (req, res) => {
    const users = await db.User.findAll()
    if (!users) {
        return res.send({"msg": "users is not found"})
    }

    return res.send(users)
})


// get user by id
app.get('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)
    if (user) {
        return res.send(user)
    }

    return res.send({"msg": "user is not found"})
})

// create new user
app.post('/users', async (req, res) => {
    await db.User.create(req.body).then(() => {
        res.send({"msg": 'user created'})
    })
})


// delete user by id
app.delete('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)
    if (user) {
        await user.destroy()
        return res.send({"msg": "user deleted"})
    }

    return res.send({"msg": "user is not found"})
})


// update user by id
app.put('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)
    if (!user) {
        return res.send({"msg": "user is not found"})
    }

    try {
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName
        user.email = req.body.email
        user.age = req.body.age
        await user.save()
        res.send({"msg": "updated"})
    } catch (err) {
        return res.send({"msg": `error ${err}`})
    }
})


app.listen(port, () => {
    console.log(`server running, port: ${port}`)
})