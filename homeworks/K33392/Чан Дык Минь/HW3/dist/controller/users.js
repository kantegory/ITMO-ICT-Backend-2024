"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserById = exports.getAllUser = exports.deleteUser = exports.loginUser = exports.registerUser = void 0;
const userService = __importStar(require("../services/users"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.createUser(req.body);
        return res.status(201).json({ message: "User registered successfully!", data: user });
    }
    catch (error) {
        return res.status(500).json({ message: "Error creating user", error });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const user = yield userService.login(body);
        return res.status(201).json({ message: "User logged in successfully!", data: user });
    }
    catch (error) {
        return res.status(500).json({ message: "Error login user", error });
    }
});
exports.loginUser = loginUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield userService.deleteUser(parseInt(id));
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully!", data: user });
    }
    catch (error) {
        return res.status(500).json({ message: "Error deleting user", error });
    }
});
exports.deleteUser = deleteUser;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield userService.getAllUsers();
        return res.status(200).json({ message: "User fetched using userService successfully!", data: allUsers });
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching user", error });
    }
});
exports.getAllUser = getAllUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield userService.getUserById(parseInt(id));
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User fetched using userService successfully!", data: user });
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching user", error });
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield userService.updateUsers(parseInt(id), req.body);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User fetched using userService successfully!", data: user });
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching user", error });
    }
});
exports.updateUser = updateUser;
