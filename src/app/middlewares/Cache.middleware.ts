import { Request, NextFunction, Response } from 'express';
import { Res } from '../core/types/Types';
import { getRedisClient } from '../core/redis/Redis';

export const Cache = key => {
  return async (req: Request, res: Res, next: NextFunction) => {
    const original_send = res.send;
    const client = getRedisClient();
    let response;
    res.send = function <ResBody = any, T = Response<ResBody>>(
      chunk: ResBody,
    ): T {
      response = chunk;
      return original_send.apply(res, arguments);
    };
    let data = await client.get(key);
    if (data) {
      return res.success({ result: { [key]: data } });
    }
    next();
    data = response.result[key];
    await client.set(key, data);
  };
};
