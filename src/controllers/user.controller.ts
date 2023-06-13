import {
  ChangeUserDetailsRequest,
  // IControllerClass,
  // UserModel,
  UserRequest,
  UserSession,
} from "../utils/types";
import { BcryptService } from "../services/helperServices/bcrypt.service";
// import { HelperService } from "../services/helperServices/helper.service";
import { UserService } from "../services/user.service";
import { EmailExists, UserNotFound } from "../utils/errors";
import { Request } from "express";

export class UserController {
  // private helperService: HelperService;
  private userService: UserService;
  private bcryptService: BcryptService;

  constructor() {
    // this.helperService = new HelperService();
    this.userService = new UserService();
    this.bcryptService = new BcryptService();
  }

  public async insert(params: UserRequest) {
    const { username, email, password, first_name, last_name, role } = params;

    if (await this.userService.emailExists(email)) {
      throw new EmailExists();
    }

    const hashedPassword = await this.bcryptService.hash(password);

    const user = await this.userService.create({
      username,
      email,
      password: hashedPassword,
      first_name,
      last_name,
      role,
    });

    return user;
  }

  public async delete(_id: string) {
    return await this.userService.delete(_id);
  }

  public async getAll() {
    return await this.userService.get({});
  }

  public async getOneById(_id: string) {
    return await this.userService.getOne({ _id });
  }

  public async regenerateTokens(session: UserSession) {
    const user = await this.getOneById(session.user_id);
    if (!user) {
      throw new UserNotFound();
    }

    const newSession = await this.userService.saveSession(session.user_id);
    this.userService.deleteSession(session.entityId);
    return newSession;
  }

  public async logout(session: UserSession) {
    await this.userService.deleteSession(session.entityId);
    return true;
  }

  public async changePassword(req: Request<{}, {}, { password: string }>) {
    const hashedPassword = await this.bcryptService.hash(req.body.password);
    await this.userService.updatePasswordById(
      req.session.user_id,
      hashedPassword
    );
    return true;
  }

  public async changeUserDetails(
    req: Request<{}, {}, ChangeUserDetailsRequest>
  ) {
    const { first_name, last_name, email } = req.body;

    await this.userService.updateUserDetails(req.session.user_id, {
      first_name,
      last_name,
      email,
    });
  }
}

export default new UserController();
