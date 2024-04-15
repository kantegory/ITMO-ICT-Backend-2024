import Repository from 'sequelize-typescript';
import User from '../model/user'
import sequelize from '../config/db';
import { Hackathon } from '../model/task';
import { ParticipantRepository } from './participant';


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