import { Request, Response, NextFunction } from 'express';
import { Obj } from '../types/Types';

export function errorHandler(cn) {
  const prototype = Object.getOwnPropertyNames(cn.prototype);
  prototype.shift();
  prototype.map(h => {
    const func = cn.prototype[h];
    cn.prototype[h] = (req: Request, res: Response, next: NextFunction) => {
      func(req, res, next).catch((err: Obj) => {
        console.log(err);
        // do something
        res.status(err.code || 400).send({ message: err.message, success:false, result:null });
      });
    };
  });
  return cn;
}
