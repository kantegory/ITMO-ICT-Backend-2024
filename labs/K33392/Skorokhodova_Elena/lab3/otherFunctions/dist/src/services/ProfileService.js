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
exports.ProfileService = void 0;
const Profile_1 = require("../models/Profile");
const User_1 = require("../models/User");
class ProfileService {
    static createOrUpdateProfile(userId, location, bio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let profile = yield Profile_1.Profile.findOne({ where: { userId } });
                if (!profile) {
                    profile = yield Profile_1.Profile.create({ userId, location, bio });
                }
                else {
                    profile.location = location;
                    profile.bio = bio;
                    yield profile.save();
                }
                const user = yield User_1.User.findByPk(userId);
                if (!user) {
                    throw new Error('User not found');
                }
                return {
                    profile: {
                        id: profile.id,
                        userId: profile.userId,
                        location: profile.location,
                        bio: profile.bio,
                    },
                    userName: user.name,
                    userEmail: user.email
                };
            }
            catch (error) {
                throw new Error('Error creating or updating profile: ' + error.message);
            }
        });
    }
    static getProfileByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findByPk(userId);
            if (!user) {
                return null;
            }
            const profile = yield Profile_1.Profile.findOne({ where: { userId } });
            if (!profile) {
                return null;
            }
            return {
                profile: {
                    id: profile.id,
                    userId: profile.userId,
                    location: profile.location,
                    bio: profile.bio,
                },
                userName: user.name,
                userEmail: user.email
            };
        });
    }
}
exports.ProfileService = ProfileService;
