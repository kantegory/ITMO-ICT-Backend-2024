import express from 'express';
import sequelize from './providers/db.js';
import dotenv from 'dotenv';
import userRouter from './routes/User.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use('/users', userRouter);
app.listen(+process.env.PORT, "0.0.0.0", () => {
    sequelize; // to not delete after compilation
    console.log(`Listening on port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map