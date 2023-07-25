import { Redis } from "~/server/redis";

export async function getUserTries(id: string) {
  const redis = await Redis.getClient();
  return await redis.get(id);
}

export async function setUserTries(id: string) {
  const redis = await Redis.getClient();
  return await redis.set(id, 1, { EX: 60 * 60 * 24 });
}

export async function addUserTries(id: string) {
  const redis = await Redis.getClient();
  return await redis.incr(id);
}
