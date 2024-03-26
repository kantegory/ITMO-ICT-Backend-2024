import express from 'express';
import bodyParser from 'body-parser';
import { userRoutes } from './src/routes/userRoutes';

const app = express();

app.use(bodyParser.json());
app.use(userRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
