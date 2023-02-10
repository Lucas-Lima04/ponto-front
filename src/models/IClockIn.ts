import { IUser } from "./IUser";

export interface IClockIn {
    guid: string;
    observation: String;
    date: Date;
    isIn: boolean;

    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;

    user?: IUser;
    userGuid: string;
}
