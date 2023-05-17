import jwt, { Secret } from "jsonwebtoken"
import { JWTSign } from "../lib/types"

export class JwtService {
  public sign(config: JWTSign) {
    return jwt.sign(config.payload, config.secretOrPrivateKey, config.options)
  }

  public verify(token: string, secretOrPrivateKey: Secret) {
    return jwt.verify(token, secretOrPrivateKey)
  }
}

export default new JwtService()