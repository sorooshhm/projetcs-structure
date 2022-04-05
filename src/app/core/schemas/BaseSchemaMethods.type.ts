import { ObjectId, Model } from 'mongoose';

export interface BaseSchemaMethods extends Model<any, any, {}, any> {
  id: (id: string | ObjectId, ...args: any[]) => Promise<any>;
}
