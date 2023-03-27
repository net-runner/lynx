import log from '../helpers/logger';
import { createClient } from '@redis/client';

const { REDIS_URL } = process.env;

const redisClient = createClient({ url: REDIS_URL });

redisClient.on('ready', () => log.info('[REDIS] Connected'));
redisClient.on('error', (e) => log.error('[REDIS] ' + e));

export default redisClient;
