import userModel from "../models/DB/user.model";

export class UserService {
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
}

export default new UserService();
