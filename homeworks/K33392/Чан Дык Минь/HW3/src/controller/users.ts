import { RequestHandler } from "express";
import express from "express"
import * as userService from "../services/users"

export const registerUser: RequestHandler = async(req: express.Request, res: express.Response) => {
    try{
        const user = await userService.createUser(req.body);
        return res.status(201).json({ message: "User registered successfully!", data: user });
    } catch (error) {
        return res.status(500).json({ message: "Error creating user", error });
    }
};

export const loginUser: RequestHandler = async(req: express.Request, res: express.Response) => {
    const { body } = req;

    try{
        const user = await userService.login(body);
        return res.status(201).json({ message: "User logged in successfully!", data: user });
    } catch (error) {
        return res.status(500).json({ message: "Error login user", error });
    }
};

export const deleteUser: RequestHandler = async(req: express.Request, res: express.Response) => {
    try{
        const {id} = req.params;
        const user = await userService.deleteUser(parseInt(id));
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully!", data: user });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting user", error });
    }
};

export const getAllUser: RequestHandler = async(req: express.Request, res: express.Response) => {
    try{
        const allUsers = await userService.getAllUsers();
        return res.status(200).json({ message: "User fetched using userService successfully!", data: allUsers });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching user", error });
    }
};

export const getUserById: RequestHandler = async(req: express.Request, res: express.Response) => {
    try{
        const {id} = req.params;
        const user = await userService.getUserById(parseInt(id));
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User fetched using userService successfully!", data: user });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching user", error });
    }
};

export const updateUser: RequestHandler = async(req: express.Request, res: express.Response) => {
    try{
        const {id} = req.params;
        const user = await userService.updateUsers(parseInt(id), req.body);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User fetched using userService successfully!", data: user });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching user", error });
    }
};
