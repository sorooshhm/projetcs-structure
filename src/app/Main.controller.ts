import { Res } from './core/types/Types';
import { CloudInterface } from './core/cloud/CloudInterface';
import { Request, Response } from 'express';
import { errorHandler } from './core/controller/errorHandler';
import * as _ from 'lodash';

class MainController {
  async getMedia(req: Request, res: Res) {
    const imgName = req.params.name;
    const cloud = CloudInterface.getCloud();

    const img = await cloud.getObject(imgName);
    const imgHeaders = _.omit(img, ['Body']);
    const imgBody = img.Body;
    
    return res.set(imgHeaders).success(imgBody);
  }
}

export default new (errorHandler(MainController))() as MainController;
