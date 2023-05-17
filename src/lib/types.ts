import { Secret, SignOptions } from "jsonwebtoken";
import { UserRoles } from "../utils/constants";

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
  username: string, 
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  role: UserRoles
}

export interface LoginRequests {
  email: string,
  password: string
}