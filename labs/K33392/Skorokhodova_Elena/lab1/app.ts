import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './src/config/database'; 
import { userRoutes } from './src/routes/userRoutes';

const app = express();


async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); 
  }
}


async function startServer() {
  app.use(bodyParser.json());
  app.use('/users', userRoutes);

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

async function main() {
  await connectToDatabase();
  await startServer();
}

main();
