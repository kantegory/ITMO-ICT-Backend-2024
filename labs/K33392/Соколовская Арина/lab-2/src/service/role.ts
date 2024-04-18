import { Role } from '../model/user'
import { RoleRepository } from '../repository/role';

export class RoleService {
    private roleRepository: RoleRepository;

    constructor() {
        this.roleRepository = new RoleRepository();
    }

    async post(role: Role): Promise<Role | null> {
        const new_role = await this.roleRepository.post(role);
        return new_role;
    }
}