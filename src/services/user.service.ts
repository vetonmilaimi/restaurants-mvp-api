import userModel from "../models/user.model";

export class UserService {
  async get(params: Object = {}, complete: boolean = false) {
    return await userModel
      .find(params, complete ? {} : { password: false })
      .exec();
  }

  async create(params: Object = {}) {
    return await userModel.create(params);
  }

  async getOne(params: Object, complete: boolean = false) {
    return await userModel
      .findOne(params, complete ? {} : { password: false })
      .exec();
  }

  async update(_id: string, params: Object) {
    return await userModel.updateOne({ _id }, params).exec();
  }

  async delete(_id: string) {
    return await userModel.deleteOne({ _id }).exec();
  }
}

export default new UserService();
