import { Profile } from "../models/Profile";
import { User } from "../models/User";

class ProfileService {
  public static async createOrUpdateProfile(
    userId: number,
    location: string,
    bio: string
  ): Promise<any> {
    try {
      let profile = await Profile.findOne({ where: { userId } });
      if (!profile) {
        profile = await Profile.create({ userId, location, bio });
      } else {
        profile.location = location;
        profile.bio = bio;
        await profile.save();
      }

      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }

      return {
        profile: {
          id: profile.id,
          userId: profile.userId,
          location: profile.location,
          bio: profile.bio,
        },
        userName: user.name,
        userEmail: user.email,
      };
    } catch (error: any) {
      throw new Error("Error creating or updating profile: " + error.message);
    }
  }

  public static async getProfileByUserId(userId: number): Promise<any | null> {
    const user = await User.findByPk(userId);

    if (!user) {
      return null;
    }

    const profile = await Profile.findOne({ where: { userId } });

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
      userEmail: user.email,
    };
  }
}

export { ProfileService };
