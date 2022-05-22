import * as redis from 'redis';

let client: any;

export const connectRedis = async (opt?) => {
  client = redis.createClient();
  client.on('error', err => {
    console.log('redis client got error', err);
  });
  await client.connect();
};

export const getRedisClient = () => {
  if (!client) {
    throw new Error('you must firs connect to redis ');
  }
  return client;
};
