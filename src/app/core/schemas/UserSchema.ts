import { CONFIGS } from '../enums/Configs.enum';
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { hash } from '../utils/utils';
import BaseSchema from './Schema';

export default class UserSchema extends BaseSchema {
  constructor(...args: any[]) {
    let [schema, opt] = args;
    schema = {
      ...schema,
      name: { type: String, required: false },
      familyName: { type: String, required: false },
      phone: { type: String, required: true },
      password_hash: { type: Boolean, required: true, default: false },
      password: { type: String, required: true },
    };
    args[0] = schema;
    super(...args);
    this.pre('save', async function (next) {
      if (!this.password_hash) {
        const hashedPass = await hash(this.password);
        this.password = hashedPass;
        this.password_hash = true;
      }
    });
    this.methods.generateToken = function () {
      const data = {
        id: this._id,
        role: this.role,
        exp: Date.now() + 10368000000,
      };
      const token = jwt.sign(data, (process.env.JWT_SECRET as string));
      return token;
    };
    this.methods.comparePassword = async function (pass) {
      return await bcrypt.compare(pass, this.password);
    };
  }
}
