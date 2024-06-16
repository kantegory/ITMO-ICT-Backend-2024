import express from "express"
import proxy from "express-http-proxy"
import 'dotenv/config'

const app = express();
app.use(express.json());

app.use('/auth', proxy(`http://localhost:${process.env.auth_port}`));
app.use('/', proxy(`http://localhost:${process.env.app_port}`));

app.listen(process.env.port, () => {
    console.log(`Running server on port ${process.env.port}`);
});