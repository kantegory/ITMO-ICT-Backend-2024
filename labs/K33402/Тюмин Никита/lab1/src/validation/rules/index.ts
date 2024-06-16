import User from "../../models/user";

export const uniqueEmail = async (email: string) => {
    //@ts-ignore
    const user = await User.findOne({where: { email: email }});
    if (user) {
        return Promise.reject('Email already exists');
    }
}