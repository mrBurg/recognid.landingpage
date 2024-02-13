import axios, { AxiosRequestConfig } from 'axios';
import { toJS } from 'mobx';

import { TJSON } from '@interfaces';
import { URIS, METHOD } from '@routes';
// import { isBrowser } from '@utils';
import { HEADERS } from '@src/constants';
import { makeApiUri } from '@src/utils/molders';
// import { checkStatus } from './apiUtils';

export class CommonApi {
  private headerRequestConfig(
    url: string,
    method: METHOD,
    data?: TJSON
  ): AxiosRequestConfig {
    let headers = {
      [HEADERS.CONTENT_TYPE]: 'application/json',
    } as Record<string, string>;

    /* if (isBrowser) {
      headers = {
        ...headers,
        [HEADERS.SITE_URL]: window.location.href,
      };
    } */

    let dataType = {};

    if (data) {
      dataType = {
        [method == METHOD.GET ? 'params' : 'data']: data,
      };
    }

    const requestConfig: AxiosRequestConfig = {
      // baseURL: makeApiUri(true),
      ...dataType,
      baseURL: makeApiUri(),
      method,
      url,
      headers,
    };

    return requestConfig;
  }

  postHeaderRequestConfig(url: string, data?: TJSON): AxiosRequestConfig {
    return this.headerRequestConfig(url, METHOD.POST, data);
  }

  getHeaderRequestConfig(url: string, data?: TJSON): AxiosRequestConfig {
    return this.headerRequestConfig(url, METHOD.GET, data);
  }

  //send Question form
  async sendQuestionForm(data?: TJSON): Promise<any> {
    const requestConfig = this.postHeaderRequestConfig(URIS.QUESTION, data);

    try {
      const response = await axios(requestConfig);

      if (response) return response.status;
    } catch (error: any) {
      //const { status } = error.response;
      console.log('# Error:', toJS(error));
      //return status;
    }
  }

  /**
   * /RCGNID-68. Google Tag Manager
   * @returns service return: `{"value":""}`. This return: string.
   */
  async getGTM(): Promise<any> {
    const requestConfig = this.getHeaderRequestConfig(URIS.GOOGLE_TAG_MANAGER);

    try {
      const response = await axios(requestConfig);
      const { data } = response;

      if (response && data.value) {
        return data.value;
      }
    } catch (error: any) {
      console.log('# Error:', toJS(error));
    }
  }
}
