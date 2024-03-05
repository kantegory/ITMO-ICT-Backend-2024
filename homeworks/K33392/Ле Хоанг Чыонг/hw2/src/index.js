const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const userRoutes = require('../routes/userRoutes');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());


app.use('/api', userRoutes);

app.listen(parseInt(port), () =>
 console.log(`Server running at http://localhost:${port}`)
);



