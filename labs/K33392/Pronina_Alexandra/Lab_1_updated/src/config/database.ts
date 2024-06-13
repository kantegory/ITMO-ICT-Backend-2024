import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User'; // Путь к модели User

class SQLRepo {

    repo: Sequelize | null = null;

    constructor() {
        this.connectDb();
    }

    connectDb(): any {
        this.repo = new Sequelize({
            database: 'db',
            dialect: 'sqlite',
            username: 'root',
            password: '',
            storage: 'db.sqlite',
            models: [User], // Добавляем модель User в массив моделей
        });

        this.syncModels();
        this.testConnection();
    }

    syncModels(): void {
        if (this.repo) {
            this.repo.sync()
                .then(() => {
                    console.log("Models synchronized");
                })
                .catch((error: any) => {
                    console.log("Models synchronization error: " + error);
                });
        } else {
            console.log("Repository is not initialized");
        }
    }

    async testConnection(): Promise<void> {
        try {
            if (this.repo) {
                await this.repo.authenticate();
                console.log('Connection has been established successfully.');
            } else {
                console.error('Repository is not initialized');
            }
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export { SQLRepo };
