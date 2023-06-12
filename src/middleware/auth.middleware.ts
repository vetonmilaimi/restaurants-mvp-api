import { NextFunction, Request, Response } from "express";

import { UserService } from "../services/user.service";
import TokenService from "../services/helperServices/token.service";
import {
  ExpiredAccessToken,
  ExpiredRefreshToken,
  InvalidRefreshToken,
  InvalidToken,
} from "../utils/errors";
import { UserSession } from "../utils/types";

export class AuthMiddleware {
  // private jwt: JwtService;
  private userService: UserService;
  private tokenService: TokenService;

  constructor() {
    // this.jwt = new JwtService();
    this.userService = new UserService();
    this.tokenService = new TokenService();
  }

  public validateAccessToken = async (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    const access_token = req.headers.access_token as string;
    const session = await this.userService.findSession(access_token);

    if (!session) {
      throw new InvalidToken();
    }
    const userSession = {
      ...session.toRedisJson(),
      entityId: session.entityId,
    } as UserSession;

    if (this.tokenService.didTokenExpire(userSession.access_token_exp)) {
      throw new ExpiredAccessToken();
    }

    req.session = userSession;
    next();
  };

  public validateRefreshToken = async (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    const access_token = req.headers.access_token as string;
    const refresh_token = req.headers.refresh_token as string;

    const session = await this.userService.findSession(access_token);
    if (!session) {
      throw new InvalidToken();
    }
    const userSession = {
      ...session.toRedisJson(),
      entityId: session.entityId,
    } as UserSession;

    if (userSession.refresh_token !== refresh_token) {
      throw new InvalidRefreshToken();
    }

    if (this.tokenService.didTokenExpire(userSession.refresh_token_exp)) {
      throw new ExpiredRefreshToken();
    }

    next();
  };
  // protected getTokenFromHeader = (req: Request) => {
  //   let token = req.headers.authorization;
  //   if (!token) throw new TokenNotExists();

  //   if (token?.startsWith("Bearer ")) token = token.slice(7, token.length);
  //   return token;
  // };

  // validateToken = (req: Request, _res: Response, next: NextFunction) => {
  //   const token = this.getTokenFromHeader(req);

  //   try {
  //     const decoded = this.jwt.verify(token, accessTokenKey);
  //     req.decoded = (decoded as AuthJWT)._id;
  //     next();
  //   } catch (err: unknown) {
  //     throw new InvalidToken();
  //   }
  // };
}

export default new AuthMiddleware();
