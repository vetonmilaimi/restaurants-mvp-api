import { Schema, Entity } from "redis-om";
import Redis from "../../services/helperServices/redis.service";

class Session extends Entity {}

const sessionSchema = new Schema(Session, {
  user_id: { type: "string" },
  access_token: { type: "string" },
  refresh_token: { type: "string" },
  access_token_exp: { type: "number" },
  refresh_token_exp: { type: "number" },
});

Redis.createIndex(sessionSchema);

export default sessionSchema;
