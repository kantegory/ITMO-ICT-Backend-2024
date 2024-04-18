import { User } from '../model/user';
import sequelize from '../config/db';
import { UserNotFound, UserAlreadyExists } from '../error/user';


export class UserRepository {
    private repository = sequelize.getRepository(User);

    async findById(id: number): Promise<User> {
        const user = await this.repository.findByPk(id);
        if (user === null) throw new UserNotFound();
        return user;
    }

    async patch(id: number, user: User): Promise<User>{
        let db_user = await this.repository.findByPk(id);
        db_user = user;
        await db_user.save(); 
        return db_user;
    }

    async create(user: User): Promise<User>{
        let db_user = await this.repository.findByPk(user.id);
        if (db_user != null) throw new UserAlreadyExists();
        db_user = user;
        await db_user.save();
        return db_user;
    }
}