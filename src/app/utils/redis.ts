import { Redis } from "@upstash/redis";
export type CompanionKey = {
  companionName: string;
  modelName: string;
  userId: string;
  name: string;
};

class RedisManager {
  private static instance: RedisManager;
  private client: Redis;
  public constructor() {
    this.client = Redis.fromEnv();
  }

  public static async getInstance(): Promise<RedisManager> {
    if (!RedisManager.instance) {
      RedisManager.instance = new RedisManager();
    }
    return RedisManager.instance;
  }

  public async addGeneration(
    outputs: {
      type: string;
      text: string;
      subject: string;
      topic: string;
      gradeLevel: string;
      additionalNotes: string;
    }[]
  ) {
    const randomString =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    for (const output of outputs) {
      await this.client.lpush(`${randomString}`, output);
    }
    return { outputs, id: randomString };
  }

  public async getGeneration(id: string) {
    const arr = await this.client.lrange(id, 0, -1);
    return arr;
  }
  public async addUserCredit(userId: string, creditId: string) {
    const userCredits: string[] | null = await this.client.hget(
      `${userId}-credits`,
      "credits"
    );
    const arr = userCredits ? [...userCredits, creditId] : [creditId];
    await this.client.hset(`${userId}-credits`, {
      credits: arr,
    });
    return arr;
  }

  public async getUserCredits(userId: string) {
    const credits = (await this.client.hget(
      `${userId}-credits`,
      "credits"
    )) as string;
    return credits;
  }

  public async getAllCredits() {
    const allCredits = await this.client.hgetall(`credits`);
    return allCredits;
  }
}

export default RedisManager;
