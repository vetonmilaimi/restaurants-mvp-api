import crypto from "crypto";
import userModel from "../models/DB/user.model";
import sessionSchema from "../models/Redis/session.model";
import Redis from "./helperServices/redis.service";
import TokenService from "./helperServices/token.service";
import { ChangeUserDetailsRequest } from "../utils/types";

export class UserService {
  private redisService: Redis;
  private tokenService: TokenService;

  constructor() {
    this.redisService = new Redis();
    this.tokenService = new TokenService();
  }

  public async emailExists(email: string) {
    return await userModel.findOne({ email }).lean().exec();
  }

  public async get(params: Object = {}, complete: boolean = false) {
    return await userModel
      .find(params, complete ? {} : { password: false })
      .lean()
      .exec();
  }

  public async create(params: Object = {}) {
    return await userModel.create(params);
  }

  public async getOne(params: Object, complete: boolean = false) {
    return await userModel
      .findOne(params, complete ? {} : { password: false })
      .lean()
      .exec();
  }

  public async update(_id: string, params: Object) {
    return await userModel.updateOne({ _id }, params).exec();
  }

  public async delete(_id: string) {
    return await userModel.deleteOne({ _id }).exec();
  }

  public async saveSession(userId: string) {
    const repo = await this.redisService.fetchRepo(sessionSchema);
    return await repo.createAndSave({
      user_id: userId,
      access_token: crypto.randomBytes(30).toString("hex"),
      refresh_token: crypto.randomBytes(30).toString("hex"),
      access_token_exp: this.tokenService.generateExpTime("5m"),
      refresh_token_exp: this.tokenService.generateExpTime("2d"),
    });
  }

  public async findSession(access_token: string) {
    const repo = await this.redisService.fetchRepo(sessionSchema);
    return await repo
      .search()
      .where("access_token")
      .equalTo(access_token)
      .first();
  }

  public async deleteSession(entityId: string) {
    const repo = await this.redisService.fetchRepo(sessionSchema);
    await repo.remove(entityId);
  }

  public async updatePasswordById(_id: string, password: string) {
    return await userModel.updateOne({ _id }, { password });
  }

  public async updateUserDetails(
    _id: string,
    params: ChangeUserDetailsRequest
  ) {
    return await userModel.updateOne({ _id }, params);
  }

  public async updateUserProfileImage(_id: string, profileImage: string) {
    return await userModel.updateOne({ _id }, { profileImage: profileImage });
  }
}

export default new UserService();
