import { Request } from 'express';
import { IUser } from '../models/User';

export interface AuthRequest extends Request {
  user?: IUser;
}

export interface RegisterUser {
  name: string;
  email: string;
  password?: string;
  firebaseId?: string;
}

export interface LoginUser {
  email: string;
  password?: string;
  firebaseId?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    firebaseId?: string;
  };
}