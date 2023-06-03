export interface IRestaurant {
  _id?: string;
  name: string;
  city: string;
  address: string;
  unique_id: string;
  Branding: {
    logo: string;
    color_1: string;
    color_2: string;
  };
}

export interface IRestaurantComplete extends IRestaurant {
  updatedAt: Date;
  createdAt: Date;
}
