import { NextFunction, Request, Response } from "express";

import { accessTokenKey } from "../utils/constants";
import { AuthJWT } from "../utils/types";
import { InvalidToken, TokenNotExists } from "../utils/errors";
import { JwtService } from "../services/helperServices/jwt.service";

export class AuthMiddleware {
  private jwt: JwtService;

  constructor() {
    this.jwt = new JwtService();
  }

  protected getTokenFromHeader = (req: Request) => {
    let token = req.headers.authorization;
    if (!token) throw new TokenNotExists();

    if (token?.startsWith("Bearer ")) token = token.slice(7, token.length);
    return token;
  };

  validateToken = (req: Request, _res: Response, next: NextFunction) => {
    const token = this.getTokenFromHeader(req);

    try {
      const decoded = this.jwt.verify(token, accessTokenKey);
      req.decoded = (decoded as AuthJWT)._id;
      next();
    } catch (err: unknown) {
      throw new InvalidToken();
    }
  };
}

export default new AuthMiddleware();
