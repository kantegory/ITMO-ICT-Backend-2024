const express = require('express')

const app = express()
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index', {
    text: 'If you see this text that means that everything is working just fine',
  })
})

const userRouter = require('./routes/users')
app.use('/users', userRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
