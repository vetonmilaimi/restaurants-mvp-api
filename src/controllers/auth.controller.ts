import { JWTSign, LoginRequests } from "../lib/types";
import { BcryptService } from "../services/Bcrypt.service";
import { HelperService } from "../services/Helper.service";
import { JwtService } from "../services/Jwt.service";
import { UserService } from "../services/User.service";
import { accessTokenKey } from "../utils/constants";
import { IncorrectPassword, UserNotFound } from "../utils/errors";

export class AuthController {
  private helperService: HelperService;
  private userService: UserService;
  private bcrypt: BcryptService;
  private jwt: JwtService;

  constructor() {
    this.userService = new UserService();
    this.helperService = new HelperService();
    this.bcrypt = new BcryptService();
    this.jwt = new JwtService();
  }

  async login(params: LoginRequests) {
    const { email, password } = params;

    const existUser = await this.userService.getOne({ email }, true);

    if (!existUser) {
      throw new UserNotFound();
    }

    if (!this.bcrypt.compare(password, existUser.password)) {
      throw new IncorrectPassword();
    }

    const jwtConfig: JWTSign = {
      payload: {
        email: existUser.email,
        _id: existUser._id,
      },
      secretOrPrivateKey: accessTokenKey,
    };

    const accessToken = this.jwt.sign(jwtConfig);

    const user = {
      token: accessToken,
      email: existUser.email,
      role: existUser.role,
      _id: existUser._id,
    };
  }
}

export default new AuthController();
