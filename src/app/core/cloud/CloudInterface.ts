import { S3 } from 'aws-sdk';
import { DeleteObjectOutput, GetObjectOutput, PutObjectOutput } from 'aws-sdk/clients/s3';
import { Obj } from '../types/Types';

let cloud: CloudInterface;

export class CloudInterface {
  s3: S3;
  BUCKET_NAME: string;
  constructor(env: Obj) {
    const { ACCESS_KEY, SECRET_KEY, API_ENDPOINT, BUCKET_NAME } = env;
    this.BUCKET_NAME = BUCKET_NAME;
    this.s3 = new S3({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY,
      endpoint: API_ENDPOINT,
      s3ForcePathStyle: true,
    });
  }
  deleteObject(name: string): Promise<DeleteObjectOutput> {
    return new Promise((res, rej) => {
      this.s3.deleteObject(
        { Bucket: this.BUCKET_NAME, Key: name },
        (err, data) => {
          if (err) {
            return rej(err);
          }
          res(data);
        },
      );
    });
  }
  putObject(name: string, file: Buffer): Promise<PutObjectOutput> {
    return new Promise((res, rej) => {
      this.s3.putObject(
        {
          Bucket: this.BUCKET_NAME,
          Key: name,
          Body: file,
        },
        (err, data) => {
          if (err) {
            console.log(err);
            return rej(err);
          }
          res(data);
        },
      );
    });
  }
  getObject(name: string): Promise<GetObjectOutput> {
    return new Promise((res, rej) => {
      this.s3.getObject(
        {
          Key: name,
          Bucket: this.BUCKET_NAME,
        },
        (err, data) => {
          if (err) {
            console.log(err);
            return rej(err);
          }
          res(data);
        },
      );
    });
  }

  static setCloud(cloudHandler: CloudInterface) {
    cloud = cloudHandler;
  }
  static getCloud() {
    return cloud;
  }
}
