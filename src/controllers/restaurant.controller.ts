import { HelperService } from "../services/helperServices/helper.service";
import { RestaurantService } from "../services/restaurant.service";
import { RestaurantUniqueIdExists } from "../utils/errors";
import { IRestaurant } from "../utils/restaurantTypes";

export class RestaurantController {
  // private helperService: HelperService;
  private restaurantService: RestaurantService;

  constructor() {
    // this.helperService = new HelperService();
    this.restaurantService = new RestaurantService();
  }

  public async insert(params: IRestaurant) {
    const { name, city, address, unique_id, Branding } = params;

    if (await this.restaurantService.uniqueIdExists(unique_id)) {
      throw new RestaurantUniqueIdExists();
    }

    const restaurant = await this.restaurantService.create({
      name,
      city,
      address,
      unique_id,
      Branding,
    });

    return restaurant._id;
  }

  public async getAll() {
    return await this.restaurantService.get();
  }

  public async delete(_id: string) {
    return await this.restaurantService.delete(_id);
  }

  public async getOneById(_id: string) {
    return await this.restaurantService.getOne({ _id });
  }

  public async update(_id: string, params: IRestaurant) {
    return await this.restaurantService.update(_id, params);
  }
}

export default new RestaurantController();
