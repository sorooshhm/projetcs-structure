import { NextFunction, Request } from 'express';
import { Model } from 'mongoose';
import { Obj, Res } from '../types/Types';
import { parseQuery } from '../utils/utils';
import { BaseSchemaMethods } from '../../core/schemas/BaseSchemaMethods.type';
import { QueryOperations } from '../schemas/OperationsQuery';

class BaseController {
  constructor(public model: BaseSchemaMethods, public module: string) {}
  async gets(req: Request, res: Res, next: NextFunction) {
    let query = req.query;
    let { oprQuery, objectOprQuery } = parseQuery(query);

    let doc = this.model.find(query).select('-password -password_hash');
    const counts = await this.model.count({});

    const oprHandler = new QueryOperations(doc);
    oprQuery.map(({ q }: Obj) => {
      oprHandler[q](objectOprQuery);
    });

    let items = await doc;

    return res.success({
      result: {
        items,
        counts,
        query: oprQuery,
        itemsCount: items.length,
      },
    });
  }
  async getById(req: Request, res: Res, next: NextFunction) {
    const id = req.params.id;
    const item = await this.model.id(id);

    return res.success({
      result: {
        [this.module]: item,
      },
    });
  }
}

export default BaseController;
