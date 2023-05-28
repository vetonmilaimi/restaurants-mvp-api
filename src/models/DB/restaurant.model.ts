import { Schema, model } from "mongoose";
import { IRestaurant } from "../../utils/restaurantTypes";

const Branding: Schema = new Schema(
  {
    logo: { type: String },
    color_1: { type: String },
    color_2: { type: String },

    __v: { type: Number, select: false },
  },
  {
    timestamps: false,
  }
);

const schema: Schema = new Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    unique_id: { type: String, required: true },
    Branding,

    __v: { type: Number, select: false },
  },
  {
    timestamps: true,
  }
);

const restaurantModel = model<IRestaurant>("restaurants", schema);
export default restaurantModel;
