import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {
    async register(user: Partial<User>) {
        const hashedPassword = await bcrypt.hash(user.password!, 10);
        user.password = hashedPassword;
        return await User.create(user);
    }

    async login(email: string, password: string) {
        const user = await User.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password!)) {
            return jwt.sign({ id: user.id, email: user.email }, 'secret-key', { expiresIn: '1h' });
        }
        return null;
    }
}
