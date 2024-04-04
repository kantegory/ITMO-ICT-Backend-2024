const express = require('express')
const db = require('./models')

const app = express()
app.use(express.json())

app.get('/users', async (req, res) => {
    try {
        const data = await db.User.findAll()
        return res.send(data)
    }
    catch(error) {
        return res.status(500).json({ message: error.message });
    }
})

app.post('/users/new', async (req, res) => {
    try {
        const data = await db.User.create(req.body)
        return res.send(data)
    }
    catch(error) {
        return res.status(400).json({ message: error.message });
    }
})

app.delete('/users/delete/:id', async (req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id)
        if (user) {
            await user.destroy()
            return res.status(200).send()
        }
        return res.status(404).json({ error: 'User not found' })
    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get('/users/:id', async(req, res) => {
    try {
        const data = await db.User.findByPk(req.params.id)
        if (data) {
            return res.send(data)
        }
        return res.status(404).json({ error: 'User not found' })
    }
    catch(error) {
        return res.status(500).json({ message: error.message });
    }
})

app.patch('/users/update/:id', async(req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id)
        if (user) {
            const data = await user.update(req.body)
            return res.send(data)
        }
        return res.status(404).json({ error: 'User not found' })
    }
    catch(error){
        return res.status(500).json({ message: error.message });
    }
})

const port = 3000

app.listen(port, () => {
    console.log("listening...")
})
