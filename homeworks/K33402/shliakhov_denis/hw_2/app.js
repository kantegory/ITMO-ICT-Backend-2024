const express = require('express')
const db = require('./models')

const app = express()
const port = 3000
const bp = require('body-parser')

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//create
app.post("/users", async (req, res) => {
    user = await db.User.create(req.body)
    return res.json(user)
})


//read
app.get('/users', async (req, res) => {
    const users = await db.User.findAll()

    if (users) {
        return res.send(users)
    }

    return res.send({"msg": "users are not found"})
})

//read id
app.get('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)

    if (user) {
      return res.send(user.toJSON())
    }

    return res.send({"msg": "user is not found"})
})

//read email
app.get('/users/:email', async (req, res) => {
    const user = await db.User.findByPk(req.params.email)

    if (user) {
      return res.send(user.toJSON())
    }

    return res.send({"msg": "user is not found"})
})

//update
app.put('/users/:id', async (req, res) => {
    const num = await db.User.update(req.body, { where: { id: req.params.id } })

    if (num == 1) {
      return res.send({'msg': 'user has been updated'})
    }

    return res.send({'msg': 'user is not found'})
})

//delete
app.delete('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)

    if (user) {
        await user.destroy()
    }
    return res.send({"msg": "user is deleted"})
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})