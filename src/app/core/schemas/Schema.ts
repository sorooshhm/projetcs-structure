import { BaseSchemaMethods } from './BaseSchemaMethods.type';
import { Obj } from '../types/Types';
import { ERROR_MESSAGE } from '../enums/ErrorMessages.enum';
import { Schema } from 'mongoose';

export default class BaseSchema extends Schema<
  any,
  any,
  any,
  BaseSchemaMethods
> {
  constructor(definition?: any, options?: any) {
    super(definition, options);
    this.statics.id = function (id, ...populates) {
      return new Promise(async (res, rej) => {
        let find = this.findById(id);
        populates.map(p => {
          find = find.populate(p);
        });
        const product = await find;
        if (!product) {
          const err = new Error(ERROR_MESSAGE.NOT_FOUND) as Obj;
          err.code = 404;
          return rej(err);
        }
        res(product);
      });
    };
  }
}
