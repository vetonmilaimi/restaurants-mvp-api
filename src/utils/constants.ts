export const nodeEnv = process.env.NODE_ENV || "development";
export const serverPort = process.env.PORT || "4000";
export const hostName = process.env.HOST || "localhost";
export const database = process.env.DB || "restaurantsDB";
export const accessTokenKey =
  process.env.JWT_KEY_ACCESS_TOKEN || "JWT_KEY_ACCESS_TOKEN";
export const accessTokenKeyExp = process.env.JWT_KEY_ACCESS_TOKEN_EXP || "5d";
export const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?\.])[A-Za-z\d#$@!%&*?\.]{8,30}$/;

export enum UserRoles {
  admin = "ADMIN",
  user = "USER",
  guest = "GUEST",
}
