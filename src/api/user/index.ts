import api from "..";
import { IGetAllParams, IPaginationResponse, ICreateUser } from "../types";
import { IUser } from "../../models/IUser";

export class UserService {
  static async getAll(): Promise<IUser[]> {
    const { data } = await api.get(`/users`);

    return data;
  }

  static async getAllActive(): Promise<IUser[]> {
    const { data } = await api.get(`/users?activeUsers=true`);

    return data;
  }

  static async createUser({
    name,
    login,
    birthDate,
    cpf,
    ctps,
    register,
    sex,
    password
  }: ICreateUser): Promise<IUser> {
    const { data } = await api.post('/users', {
      name,
      login,
      birthDate,
      cpf,
      ctps,
      register,
      sex,
      password
    });

    return data;
  }
  
  static async updateUser({
    guid,
    name,
    login,
    birthDate,
    cpf,
    ctps,
    register,
    sex,
    password
  }: ICreateUser): Promise<IUser> {
    const { data } = await api.put('/users', {
      guid,
      name,
      login,
      birthDate,
      cpf,
      ctps,
      register,
      sex,
      password
    });

    return data;
  }

  static async deleteUser(guid: string): Promise<IUser> {
    const { data } = await api.put('/users', {
      guid,
      isActive: false,
    });

    return data;
  }
  static async updatePassword({
    currentPassword,
    newPassword,
  }: {
    currentPassword?: string;
    newPassword?: string;
  }): Promise<IUser> {
    const { data } = await api.put('/users', {
      currentPassword,
      newPassword
    });

    return data;
  }

  static async findByEmail({
    email,
  }: {
    email: string;
  }): Promise<IUser> {
    const { data } = await api.post('/users/email', {
      email,
    });

    return data;
  }
}
