import { IUser, UserSession } from "../utils/types";
import BcryptService from "../services/helperServices/bcrypt.service";
// import { HelperService } from "../services/helperServices/helper.service";
import { UserService } from "../services/user.service";
import { EmailExists, UserNotFound } from "../utils/errors";

export class UserController {
  // private helperService: HelperService;
  private userService: UserService;

  constructor() {
    // this.helperService = new HelperService();
    this.userService = new UserService();
  }

  public async insert(params: IUser) {
    const { username, email, password, first_name, last_name, role } = params;

    if (await this.userService.emailExists(email)) {
      throw new EmailExists();
    }

    const hashedPassword = await BcryptService.hash(password);

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
    return await this.userService.get();
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
}

export default new UserController();
