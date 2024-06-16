import { Request, Response } from "express";
import { ProfileService } from "../services/ProfileService";
import { UserService } from "../services/UserService";

class ProfileController {
  public static async createOrUpdateProfile(
    req: Request,
    res: Response
  ): Promise<void> {
    const userId = parseInt(req.params.userId);
    const { location, bio } = req.body;

    try {
      const user = await UserService.getUserById(userId);
      if (!user) {
        res.status(404).send("User not found");
        return;
      }

      const profileData = await ProfileService.createOrUpdateProfile(
        userId,
        location,
        bio
      );

      res.status(201).json(profileData.profile);
    } catch (error) {
      console.error("Error creating or updating profile:", error);
      res.status(500).send("Error creating or updating profile");
    }
  }

  public static async getProfileByUserId(
    req: Request,
    res: Response
  ): Promise<void> {
    const userId = parseInt(req.params.userId);

    try {
      const profileData = await ProfileService.getProfileByUserId(userId);

      if (!profileData) {
        res.status(404).send("Profile not found");
        return;
      }
      res.status(200).json(profileData.profile);
    } catch (error) {
      console.error("Error getting profile:", error);
      res.status(500).send("Error getting profile");
    }
  }
}

export { ProfileController };
