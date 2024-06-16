const express = require('express')
const db = require('./models')

const app = express()
app.use(express.json())

const port = 3000

app.get('/users', async (req, res) => {
    try {
        const user = await db.User.findAll()
        return res.send(user)
    }
    catch(e) {
        return res.status(500).json({ message: e.message });
    }
})

app.get('/users/:id', async(req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id)
        if (user) {
            return res.send(user)
        }
        return res.status(404).json({ error: 'Non-existent user'})
    }
    catch(e) {
        return res.status(500).json({ message: e.message });
    }
})

app.post('/users', async (req, res) => {
    try {
        const user = await db.User.create(req.body)
        return res.send(user)
    }
    catch(e) {
        return res.status(400).json({ message: e.message });
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id)
        if (user) {
            await user.destroy()
            return res.status(200).send()
        }
        return res.status(404).json({ error: "Non-existent user"})
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.patch('/users/:id', async(req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id)
        if (user) {
            const updated_user = await user.update(req.body)
            return res.send(updated_user)
        }
        return res.status(404).json({ error: 'Non-existent user' })
    }
    catch(e){
        return res.status(500).json({ message: e.message });
    }
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})