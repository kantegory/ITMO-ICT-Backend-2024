import { Role } from '../model/user'
import sequelize from '../config/db';
import { json } from 'express';


export class RoleRepository {
    private repository = sequelize.getRepository(Role);
    
    async post(role: Role): Promise<Role> {
        const new_role = await this.repository.create(JSON.parse(JSON.stringify(role)));
        return new_role;
    }

    async findById(id: string) {
        const role = await this.repository.findByPk(id);
        return role;
    }
}