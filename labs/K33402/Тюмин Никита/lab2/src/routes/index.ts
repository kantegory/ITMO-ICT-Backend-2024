import usersRouter from './users'
import authRouter from './auth'
import userProfilesRouter from './userProfiles'
import toursRouter from './tours'
import recommendationsRouter from './recommendations'

export const routers = [
    { prefix: '/users', router: usersRouter },
    { prefix: '/auth', router: authRouter },
    { prefix: '/user_profiles', router: userProfilesRouter },
    { prefix: '/tours', router: toursRouter },
    { prefix: '/recommendations', router: recommendationsRouter },
]