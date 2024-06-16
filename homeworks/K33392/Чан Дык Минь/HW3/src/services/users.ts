import { Users, UserAttributes, AuthResult, UserLogin } from "../models/users";
import bcrypt from  "bcrypt"; 
import jwt from "jsonwebtoken";
import RefreshTokenService from "./refreshToken";
import dotenv from 'dotenv';

dotenv.config();

export const createUser = async (userData: UserAttributes): Promise<Users> => {
    const user = await Users.findOne({ where: { username: userData.username } });
        if (user) {
            throw new Error("User already exists");
        }
        
    return await Users.create(userData);
};

export const login = async (userData: UserLogin): Promise<AuthResult | null> => {
    try {
        const user = await Users.findOne({ where: { username: userData.username } });
        if (!user) {
            throw new Error("User does not exist");
        }
        const isPasswordValid = await bcrypt.compare(userData.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Password is not correct");
        }
        else {
            const accessToken = jwt.sign({ username: userData.username }, process.env.SECRET_KEY || ''); 

            const refreshTokenService = new RefreshTokenService(user)
            const refreshToken = await refreshTokenService.generateRefreshToken()
            
            return { username: user.username, accessToken, refreshToken };
        }      

    } catch (error) {
        console.error("Error occurred while logging in:", error);
        throw error;
    }
};

export const deleteUser = async (id: number): Promise<Users | null> => {
    const userToDelete = await Users.findByPk(id);
    if (!userToDelete) throw new Error("User not found");

    await Users.destroy({ where: { id } });
    return userToDelete;
};

export const getUserById = async (id: number): Promise<Users | null> => {
    return await Users.findByPk(id);
};

export const getAllUsers = async (): Promise<Users[]> => {
    return await Users.findAll();
};

export const updateUsers = async (id: number, userData: Partial<UserAttributes>): Promise<Users | null> => {
    await Users.update(userData, {where:{id}});
    return await Users.findByPk(id);
}