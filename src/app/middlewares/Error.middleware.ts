import { ERROR_MESSAGE } from '../core/enums/ErrorMessages.enum';
export function Error(err, req, res, next) {
  console.log(err);
  return res.send({
    success: false,
    message: err.message || ERROR_MESSAGE.SERVER,
  });
}
