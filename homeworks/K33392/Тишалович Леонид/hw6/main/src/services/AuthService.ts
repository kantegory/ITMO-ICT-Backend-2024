import axios from "axios";

const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL || "http://localhost:4000/auth";

export default class AuthService {
  static async login(email: string, password: string) {
    const response = await axios.post(`${AUTH_SERVICE_URL}/login`, {
      email,
      password,
    });
    return response.data;
  }

  static async register(email: string, name: string, password: string) {
    const response = await axios.post(`${AUTH_SERVICE_URL}/register`, {
      email,
      name,
      password,
    });
    return response.data;
  }
}
