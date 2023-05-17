import bcrypt from 'bcrypt'

export class BcryptService {
  private saltRound: number = 10;

  public async hash(input: Buffer | string) {
    return await bcrypt.hash(input, this.saltRound)
  }

  public async compare(input: Buffer | string, encrypted: string) {
    return await bcrypt.compare(input, encrypted)
  }
}

export default new BcryptService()