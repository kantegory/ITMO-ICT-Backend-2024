import usersRouter from './users'
import authRouter from './auth'

export const routers = [
    { prefix: '/users', router: usersRouter },
    { prefix: '/auth', router: authRouter },
]