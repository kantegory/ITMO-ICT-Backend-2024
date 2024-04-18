import { Role } from '../model/user'
import sequelize from '../config/db';
import { json } from 'express';


export class RoleRepository {
    private repository = sequelize.getRepository(Role);
    
    async post(role: Role): Promise<Role | null> {
        console.log(role);
        const new_role = await this.repository.create(role as any);
        return new_role;
    }
}