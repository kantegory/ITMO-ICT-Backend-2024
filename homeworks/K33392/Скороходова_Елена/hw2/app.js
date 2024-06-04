const express = require('express');
const app = express();

// Подключение маршрутов пользователей
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// Другие маршруты и middleware могут быть подключены здесь

// Запуск сервера на порте 3000
const PORT = process.env.PORT || 3000; // Используем порт 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
