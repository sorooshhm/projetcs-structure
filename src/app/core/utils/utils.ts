import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import * as crypto from 'crypto';

const FileReader = require('filereader');

export const hash = async (data: string) => {
  const hashed = await bcrypt.hash(data, 12);
  return hashed;
};

export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export async function emptyCollection(model: Model<any>, query: object) {
  await model.deleteMany(query);
}

export function parseQuery(query) {
  let oprQuery: object[] = [];
  let objectOprQuery: object = {};
  Object.keys(query).map(k => {
    if (k.startsWith('_') && k !== '_id') {
      oprQuery.push({ q: k.slice(1), value: query[k] });
      objectOprQuery = { ...objectOprQuery, [`${k.slice(1)}`]: query[k] };
      delete query[k];
    }
  });
  return {oprQuery, objectOprQuery};
}

export function randomString() {
  return crypto.randomBytes(40).toString('hex');
}

export function fileToBuffer(file): Promise<Buffer> {
  const fr = new FileReader();
  fr.readAsArrayBuffer(file);
  return new Promise((res, rej) => {
    fr.onload = () => {
      res(fr.result);
    };
  });
}
