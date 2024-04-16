import { User } from '../model/user';
import sequelize from '../config/db';


export class UserRepository {
    private repository = sequelize.getRepository(User);

    async findById(id: number): Promise<User | null> {
        const user = await this.repository.findByPk(id);
        return user;
    }

    async patch(id: number, user: User): Promise<User | null>{
        let db_user = await this.repository.findByPk(id);
        db_user = user;
        db_user.save();
        return db_user;
    }
}