import express from "express"
import proxy from "express-http-proxy"

const app = express();

app.use('/auth', proxy('http://localhost:8081'))
app.use('/', proxy('http://localhost:8080'))

app.listen(8000, () => {
    console.log(`Running server on port 8000`)
})