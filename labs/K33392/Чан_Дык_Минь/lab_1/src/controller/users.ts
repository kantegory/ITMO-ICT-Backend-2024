import { NextFunction, RequestHandler } from "express";
import { Users } from "../models/users";
import * as userService from "../services/users"

export const registerUser: RequestHandler = async(req: any, res: any, next: any) => {
    try{
        const user = await userService.createUser(req.body);
        return res.status(201).json({ message: "User registered successfully!", data: user });
    } catch (error: any) {
        return res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

export const loginUser: RequestHandler = async(req: any, res: any) => {
    const { body } = req;

    try{
        const user = await userService.login(body);
        console.log(user)
        return res.status(201).json({ message: "User logged in successfully!", data: user });
    } catch (error: any) {
        console.log("body: ", body)
        return res.status(500).json({ message: "Error login user", error: error.message });
    }
};

export const deleteUser: RequestHandler = async(req: any, res: any, next: any) => {
    try{
        const {id} = req.params;
        const user = await userService.deleteUser(parseInt(id));
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully!", data: user });
    } catch (error: any) {
        return res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

export const getAllUser: RequestHandler = async(req: any, res: any, next: any) => {
    try{
        const allUsers = await userService.getAllUsers();
        return res.status(200).json({ message: "User fetched using userService successfully!", data: allUsers });
    } catch (error: any) {
        return res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

export const getUserById: RequestHandler = async(req: any, res: any, next: any) => {
    try{
        const {id} = req.params;
        const user = await userService.getUserById(parseInt(id));
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User fetched using userService successfully!", data: user });
    } catch (error: any) {
        return res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

export const updateUser: RequestHandler = async(req: any, res: any, next: any) => {
    try{
        const {id} = req.params;
        const user = await userService.updateUsers(parseInt(id), req.body);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User fetched using userService successfully!", data: user });
    } catch (error: any) {
        return res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};
