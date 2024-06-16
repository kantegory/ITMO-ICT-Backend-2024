import { User } from "../models/User";
import jwt from "jsonwebtoken";
import process from "process";

class AuthService {
  static async registerUser(
    name: string,
    email: string,
    password: string
  ): Promise<string> {
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      const newUser = await User.create({
        name,
        email,
        password,
      });

      const token = jwt.sign(
        { userId: newUser.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1h",
        }
      );

      return token;
    } catch (error) {
      console.error("Error registering user:", error);
      throw new Error("Error registering user");
    }
  }

  static async loginUser(email: string, password: string): Promise<string> {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("Invalid email");
      }

      const passwordMatch = await user.checkPassword(password);
      console.log("passwordMatch:", passwordMatch);
      if (!passwordMatch) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1h",
        }
      );

      return token;
    } catch (error) {
      console.error("Error logging in:", error);
      throw new Error("Error logging in");
    }
  }
}

export { AuthService };
