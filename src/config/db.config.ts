import { CallbackError, connect } from "mongoose";
import { database } from "../utils/constants";

export const dbConnect = () => {
  connect(`mongodb://127.0.0.1:27017/${database}`)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err: CallbackError) => {
      if (err) {
        console.error("Error establishing database connection: " + err);
        return;
      }
    });
};
