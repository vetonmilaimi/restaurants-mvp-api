import { JWTSign, LoginRequests, UserSession } from "../utils/types";
import { BcryptService } from "../services/helperServices/bcrypt.service";
import { HelperService } from "../services/helperServices/helper.service";
import { JwtService } from "../services/helperServices/jwt.service";
import { UserService } from "../services/user.service";
import { accessTokenKey } from "../utils/constants";
import { IncorrectPassword, UserNotFound } from "../utils/errors";

export class AuthController {
  private helperService: HelperService;
  private userService: UserService;
  private jwt: JwtService;
  private bcrypt: BcryptService;

  constructor() {
    this.userService = new UserService();
    this.helperService = new HelperService();
    this.bcrypt = new BcryptService();
    this.jwt = new JwtService();
  }

  async login(params: LoginRequests) {
    const { email, password } = params;

    const existUser = await this.userService.emailExists(email);

    if (!existUser) {
      throw new UserNotFound();
    }

    if (!(await this.bcrypt.compare(password, existUser.password))) {
      throw new IncorrectPassword();
    }

    // const jwtConfig: JWTSign = {
    //   payload: {
    //     email: existUser.email,
    //     _id: existUser._id,
    //   },
    //   secretOrPrivateKey: accessTokenKey,
    // };

    // const accessToken = this.jwt.sign(jwtConfig);

    const session = await this.userService.saveSession(`${existUser._id}`);

    const user = {
      session,
    };

    return user;
  }

  async logout(session: UserSession) {
    await this.userService.deleteSession(session.entityId);
    return true;
  }
}

export default new AuthController();
