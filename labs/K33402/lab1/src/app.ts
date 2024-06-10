import express, { Request, Response } from 'express';
import { sequelize } from './config/database';
import { User } from './models/User';

const app = express();
const port = 3001;

app.use(express.json());

app.post('/users', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.query;
    const newUser = await User.create({ username, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error);
    res.status(500).json({ error: 'Произошла ошибка при создании пользователя' });
  }
});


app.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Пользователь не найден' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Произошла ошибка при получении пользователя' });
  }
});

app.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const result = await User.destroy({ where: { id: userId } });

    if (result === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    res.status(500).json({ error: 'Произошла ошибка при удалении пользователя' });
  }
});

app.listen(port, async () => {
  try {
    await sequelize.sync();
    console.log(`Сервер запущен на порту ${port}`);
  } catch (error) {
    console.error('Невозможно подключиться к базе данных:', error);
  }
});
