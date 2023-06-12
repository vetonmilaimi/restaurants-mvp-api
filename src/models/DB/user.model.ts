import { Schema, model } from "mongoose";
import { UserRoles } from "../../utils/constants";
import { UserModel } from "../../utils/types";

const schema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRoles),
      default: UserRoles.guest,
    },

    __v: { type: Number, select: false },
  },
  {
    timestamps: true,
  }
);

const User = model<UserModel>("User", schema);
export default User;
