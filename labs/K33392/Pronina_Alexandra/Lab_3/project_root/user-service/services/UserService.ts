import { User } from '../models/User';

let users: User[] = [];

export class UserService {
    getAllUsers(): User[] {
        return users;
    }

    async getUserById(id: number) {
        return await User.findByPk(id);
    }

    addUser(user: User): User {
        user.id = users.length + 1;
        users.push(user);
        return user;
    }

    updateUser(id: number, updatedUser: User): User | undefined {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users[index] = updatedUser as User;
            return users[index];
        }
        return undefined;
    }

    deleteUser(id: number): boolean {
        const initialLength = users.length;
        users = users.filter(user => user.id !== id);
        return users.length !== initialLength;
    }
}
