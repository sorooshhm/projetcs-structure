import { Obj } from '../core/types/Types';
import { Request, Response, NextFunction } from 'express';
import { ERROR_MESSAGE } from '../core/enums/ErrorMessages.enum';

export const ResponseMiddleware = (
  req: Request,
  res: Response & Obj,
  next: NextFunction,
) => {
  res.notFound = (data: Obj = {}) => {
    return res.status(404).send({
      message: ERROR_MESSAGE.NOT_FOUND,
      result: data,
      success: false,
    });
  };
  res.unAuth = (data: Obj = {}) => {
    return res.status(401).send({
      message: ERROR_MESSAGE.UN_AUTHORIZED,
      result: data,
      success: false,
    });
  };
  res.forbid = (data: Obj = {}) => {
    return res.status(403).send({
      message: ERROR_MESSAGE.FORBIDDEN,
      result: data,
      success: false,
    });
  };
  res.success = (data: Obj = {}) => {
    return res.send({
      success: true,
      ...data,
    });
  };
  res.fail = (data: Obj = {}) => {
    return res.send({
      success: false,
      ...data,
    });
  };

  next();
};
