const express = require('express')
const db = require('./models')

const app = express()
const port = 3000

const parser = require('body-parser')
app.use(parser.json())
app.use(parser.urlencoded({extended: true}))


app.get('/users', async (req, res) => {
    const user = await db.User.findAll()
    return res.send(user)

})

app.get('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)

    if (user) {
        return res.send(user.toJSON())
    }
    return res.status(404).send({errorMessage: "user is not found"})
})

app.post("/users", async (req, res) => {
    const user = await db.User.create(req.body)
    return res.send(user.toJSON())
})
app.put('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)
    if (user) {
        await user.update(req.body)
        res.send(user.toJSON())
    } else {
        res.status(404).send({errorMessage: "user not found"})
    }
})

app.delete('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)
    if (user) {
        await user.destroy()
        res.send()
    } else {
        res.status(404).send({errorMessage: "user not found"})
    }
})

app.listen(port, () => {
    console.log('srever running')
})
