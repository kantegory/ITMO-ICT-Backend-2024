import { User } from '../../models/user.js'

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                isAdmin: boolean;
            }
        }
    }
}
