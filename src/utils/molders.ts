import _ from 'lodash';

import { API, API_HOST, API_PORT } from '@src/constants';

function getUri(data?: (boolean | string)[]) {
  let port = '';
  let host = API_HOST;

  _.each(data, (item) => {
    switch (true) {
      case _.isBoolean(item):
        port = API_PORT;

        break;
      case _.isString(item):
        host = item as string;

        break;
    }
  });

  return port ? `${host}:${port}` : host;
}

export function makeApiUri(...data: (boolean | string)[]) {
  return getUri(data) + API;
}
