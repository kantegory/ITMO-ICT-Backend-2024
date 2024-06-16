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

    async patch(id: number, user: User): Promise<User | null>{
        let db_user = await this.repository.findByPk(id);
        if (!db_user) {
            return null;
        }

        for (const key of Object.keys(user) as (keyof User)[]) {
            if (user[key] !== undefined) {
                (db_user[key] as any) = user[key];
            }
        }

        await db_user.save();
        return db_user;
    }

    async create(user: User): Promise<User | null>{
        const new_user = await this.repository.create({name: user.name, surname: user.surname, email: user.email, password: user.password, about: user.about});
        return new_user;
    }
}