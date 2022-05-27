import Redis from 'ioredis';
import log from '../helpers/logger';

const redisClient = new Redis(process.env.REDIS_TLS_URL, {
  enableOfflineQueue: true,
  tls: {
    rejectUnauthorized: false,
  },
});
redisClient.on('ready', () => log.info('[REDIS] Connected'));

export default redisClient;
