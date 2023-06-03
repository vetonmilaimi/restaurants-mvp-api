import { Client, Entity, Schema } from 'redis-om'
import { redisUrl } from '../../utils/constants'

class Redis {
  private redisClient: Client
  constructor() {
    this.redisClient = new Client()
  }

  static async createIndex(schema: Schema<Entity>) {
    const redis = new Redis()
    await redis.connect()
    const repo = await redis.fetchRepo(schema)
    repo.createIndex()
  }

  private async connect() {
    if (!this.redisClient.isOpen()) {
      return await this.redisClient.open(redisUrl)
    }
    return this.redisClient
  }

  public async fetchRepo(schema: Schema<Entity>) {
    await this.connect()
    return this.redisClient.fetchRepository(schema)
  }
}

export default Redis
