import { Res } from '../core/types/Types';
import { Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { Obj } from '../core/types/Types';

export function Auth(...roles: string[]) {
  return async (req: Request & Obj, res: Res, next: NextFunction) => {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.unAuth();
    }
    try {
      const JWT_SECRET = process.env.JWT_SECRET || '';
      const user: Obj = jwt.verify(token, JWT_SECRET) as Obj;
      if (user.exp < Date.now()) {
        return res.fail({
          message: 'Your token has been expired',
        });
      }
      if (roles.length && !roles.includes(user.role.name)) {
        return res.forbid();
      }
      req.user = user;
      req.token = token;
      next()
    } catch (error) {
      console.log(error)
      return res.unAuth();
    }
  };
}
