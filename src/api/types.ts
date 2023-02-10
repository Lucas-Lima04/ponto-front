export interface IGetAllParams {
  page: number;
  search?: string;
  orderBy?: string;
  orderMode?: string;
}

export interface ICreateUser {
  guid?: string;
  name?: string;
  login?: string;
  password?: string;
  cpf?: string;
  birthDate?: string;
  ctps?: string;
  register?: string;
  sex?: string;
}

export interface IGetAllShifts {
  startDate: string;
  endDate: string;
  medicalGroupGuid: string;
}

export interface ICreateManyShifts {
  dates: number[];
  shiftDefinitionGuid: string;
  medicalGroupGuid: string;
  responsibleUserGuid: string | null;
  year: number;
  month: number;
}

export interface IUpdateShift {
  shiftGuid: string;
  responsibleUserGuid?: string | null;
  observation?: string | null;
  value?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  editAll: boolean;
  isActive?: boolean;
}

 export interface IPublish {
  startDate: Date;
  endDate: Date;
  medicalGroupGuid?: string;
 }

 export interface IDuplicate {
  medicalGroupGuid: string;
  currentMonth: number;
  currentYear: number;
 }
export interface IDeleteParams {
  guid: string;
}

export interface IPaginationResponse<T> {
  result: T[];
  currentPage: number;
  totalPages: number;
  totalRegisters: number;
}
export interface IShiftsResponse<T> {
  results: {shifts: T[]};
}

export interface File {
  guid: string;
  name: string;
  pathUrl: string;
}

export interface ICreateShiftDefinition {
  name: string;
  start: string;
  end: string;
  icon: number;
  segValue: number;
  terValue: number;
  quaValue: number;
  quiValue: number;
  sexValue: number;
  sabValue: number;
  domValue: number;
  numberOfShifts: number;
}

export interface IUpdateShiftDefinition {
  guid: string;
  start: string;
  end: string;
  icon: number;
  value: number;
  numberOfShifts: number;
}