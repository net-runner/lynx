import redisClient from '../lib/redis';

const getFromCache = async (key: string) =>
  JSON.parse(await redisClient.get(key));

const setExCache = async (
  key: string,
  duration_seconds: number,
  value: string
) => await redisClient.setex(key, duration_seconds, value);

export { getFromCache, setExCache };
