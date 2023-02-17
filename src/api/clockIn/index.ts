import api from "..";
import { IClockIn } from "../../models/IClockIn";

export class ClockInService {
  static async getAll(guid?: string): Promise<IClockIn[]> {
    const { data } = await api.get(guid ? `/clockins/${guid}` : '/clockins');

    return data;
  }

  static async getByDate(guid: string, startDate: Date, endDate: Date): Promise<IClockIn[]> {
    const { data } = await api.get(`/clockins/${guid}?startDate=${startDate.getMonth() + 1}-${startDate.getDate()}-${startDate.getFullYear()}&endDate=${endDate.getMonth() + 1}-${endDate.getDate()}-${endDate.getFullYear()}`);

    return data;
  }

  static async getAllByDate(startDate: Date, endDate: Date): Promise<IClockIn[]> {
    const { data } = await api.get(`/clockins?startDate=${startDate.getMonth() + 1}-${startDate.getDate()}-${startDate.getFullYear()}&endDate=${endDate.getMonth() + 1}-${endDate.getDate()}-${endDate.getFullYear()}`);

    return data;
  }

  static async createClockIn(): Promise<IClockIn> {
    const { data } = await api.post('/clockins', {
      observation: '',
    });

    return data.clockIn;
  }
  }
