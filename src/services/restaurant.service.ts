import restaurantModel from "../models/DB/restaurant.model";

export class RestaurantService {
  public async uniqueIdExists(unique_id: string) {
    return await restaurantModel.findOne({ unique_id }).lean().exec();
  }

  public async get(params: Object = {}) {
    return await restaurantModel.find(params).lean().exec();
  }

  public async create(params: Object = {}) {
    return await restaurantModel.create(params);
  }

  public async getOne(params: Object) {
    return await restaurantModel.findOne(params).lean().exec();
  }

  public async update(_id: string, params: Object) {
    return await restaurantModel.updateOne({ _id }, params).exec();
  }

  public async delete(_id: string) {
    return await restaurantModel.deleteOne({ _id }).exec();
  }
}

export default new RestaurantService();
