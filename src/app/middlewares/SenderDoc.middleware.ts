import UsersModel from '../modules/User/Users.models';
import { Request, NextFunction } from 'express';
import { Obj, Res } from '../core/types/Types';

export async function SenderDoc(
  req: Request & Obj,
  res: Res,
  next: NextFunction,
) {
  const { id } = req.user;
  try {
    const user = await UsersModel.id(id, {
      path: 'basket',
      populate: { path: 'product', select: '-images -thumbnail' },
    });

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.unAuth();
  }
}
