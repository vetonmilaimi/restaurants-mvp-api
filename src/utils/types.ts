import { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import { UserRoles } from "./constants";
import { UpdateResult, DeleteResult } from "mongodb";
import { Document } from "mongoose";

declare global {
  namespace Express {
    export interface Request {
      decoded: number | undefined;
    }
  }
}

export interface JWTSign {
  payload: string | Buffer | object;
  secretOrPrivateKey: Secret;
  options?: SignOptions | undefined;
}

export interface JWTVerify {
  token: string;
  secretOrPrivateKey: Secret;
}

export interface NodeSystemError extends Error {
  address?: string; //If present, the address to which a network connection failed
  code: string; // The string error code
  dest: string; // If present, the file path destination when reporting a file system error
  errno: number; // The system-provided error number
  info?: Object; // If present, extra details about the error condition
  message: string; // A system-provided human-readable description of the error
  path?: string; // If present, the file path when reporting a file system error
  port?: number; // If present, the network connection port that is not available
  syscall: string; // The name of the system call that triggered the error
}

export interface GlobalError {
  statusCode?: number | string;
  message: string;
  name: string;
}

export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: UserRoles;
}

export interface CompleteUser extends IUser {
  updatedAt: Date;
  createdAt: Date;
}

export interface LoginRequests {
  email: string;
  password: string;
}

export interface IControllerClass {
  getAll: <T>() => Promise<Document<T>[]>;
  getLatestUpdates: <T>() => Promise<Document<T>[]>;
  getOneById: <T>(_id: string) => Promise<Document<T> | null>;
  insert: (params: any) => Promise<string>;
  update: (_id: string, params: any) => Promise<UpdateResult>;
  delete: (_id: string) => Promise<DeleteResult>;
}

export interface AuthJWT extends JwtPayload {
  email: string;
  _id: number;
}

export interface UserSession {
  entityId: string;
  user_id: number;
  access_token: string;
  refresh_token: string;
  access_token_exp: number;
  refresh_token_exp: number;
}
