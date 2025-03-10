export interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export enum UserType {
  SUPERADMIN = "SUPERADMIN",
  USER = "USER",
  DIRECTOR = "DIRECTOR",
  REGISTRAR = "REGISTRAR",
}

export interface IVerifyNinPayload {
  nin: string;
  phoneNumber?: string;
  userId?: string;
  dob?: string;
}

export interface IDirectorProfile {
  id: number;
}

export interface IUserProfile {
  id: number;
}

export interface IRegistrarProfile {
  id: number;
}
