"use strict";
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
exports.ProfileController = void 0;
const ProfileService_1 = require("../services/ProfileService");
const UserService_1 = require("../services/UserService");
class ProfileController {
    static createOrUpdateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId);
            const { location, bio } = req.body;
            try {
                const user = yield UserService_1.UserService.getUserById(userId);
                if (!user) {
                    res.status(404).send('User not found');
                    return;
                }
                const profile = yield ProfileService_1.ProfileService.createOrUpdateProfile(userId, location, bio);
                res.status(201).json({
                    profile,
                    userName: user.name,
                    userEmail: user.email
                });
            }
            catch (error) {
                console.error('Error creating or updating profile:', error);
                res.status(500).send('Error creating or updating profile');
            }
        });
    }
    static getProfileByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId);
            try {
                const profileData = yield ProfileService_1.ProfileService.getProfileByUserId(userId);
                if (!profileData) {
                    res.status(404).send('Profile not found');
                    return;
                }
                res.status(200).json(profileData);
            }
            catch (error) {
                console.error('Error getting profile:', error);
                res.status(500).send('Error getting profile');
            }
        });
    }
}
exports.ProfileController = ProfileController;
