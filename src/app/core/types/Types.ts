import { Request, Response, NextFunction } from 'express';

export type Handler = (req: Request, res: Response, next: NextFunction) => any;

export interface Controller {
  [key: string]: Handler;
}

export type Res = Response & {
  notFound: (res?: Obj) => Response;
  unAuth: (res?: Obj) => Response;
  forbid: (res?: Obj) => Response;
  success: (res: any) => Response;
  fail: (res: any) => Response;
};

export type TagQuery = {
  findQuery: Obj;
  method: string;
  query: Obj;
};

export type Obj = { [k: string]: any };
