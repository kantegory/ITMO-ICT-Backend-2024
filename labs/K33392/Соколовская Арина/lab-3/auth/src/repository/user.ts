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

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.repository.findOne({
            where: {
                email: email,
            }
        })
        return user;
    } 

    async patch(id: number, user: User): Promise<User>{
        let db_user = await this.repository.findByPk(id);
        db_user = user;
        await db_user.save();
        return db_user;
    }

    async create(user: User): Promise<User>{
        const new_user = await this.repository.create({name: user.name, surname: user.surname, email: user.email, password: user.password, about: user.about});
        return new_user;
    }
}