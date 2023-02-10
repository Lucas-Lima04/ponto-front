import { IClockIn } from ".//IClockIn";

export interface IUser {
    guid: string;
    name: string
    login: string;
    cpf: string;
    birthDate: string;
    ctps: string;
    register: string;
    sex: string;
    encryptedPassword: string | null;
    
    authToken: string | null;
    
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    isSuperAdmin: boolean;

    clockIns?: IClockIn[]
}
