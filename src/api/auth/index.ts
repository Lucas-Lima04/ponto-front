import { IUser } from "../../models/IUser";
import api from "..";

interface LoginResponse {
    user: IUser;
    token: string;
  }

  
export class AuthService {
  static async login(email: string, password: string): Promise<LoginResponse> {
    const { data } = await api.post("/users/login", { email, password });    
    localStorage.setItem('accessToken', data.token);
    return data as unknown as LoginResponse;
  }

  static async getCurrentUser(): Promise<IUser> {
    const { data } = await api.get("/users/current");

    return data;
  }
}
