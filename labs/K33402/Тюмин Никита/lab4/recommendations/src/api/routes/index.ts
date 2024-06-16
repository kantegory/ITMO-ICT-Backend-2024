import recommendationsRouter from './recommendations'
import userProfilesRouter from './userProfiles'

export const routers = [
    { prefix: '/recommendations', router: recommendationsRouter },
    { prefix: '/user_profiles', router: userProfilesRouter },
]