import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: process.env.DB_NAME || "./database",
    synchronize: false,
    logging: false,
    entities: [__dirname + 'src/models/**/*.ts'],
    migrations: [__dirname + 'src/migration/**/*.ts'],
    subscribers: [],
});
