import { RESPONSE_STATUS } from '@src/constants';

/** Проверить статус ответа AJAX*/
export function checkStatus(status: number): boolean {
  switch (status) {
    case RESPONSE_STATUS.OK:
      return true;
    case RESPONSE_STATUS.BAD_REQUEST:
    case RESPONSE_STATUS.SERVER_ERROR:
    default:
      return false;
  }
}
