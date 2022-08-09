import useRequest from '@ahooksjs/use-request';
import Taro, { RequestParams } from '@tarojs/taro';

interface Config extends RequestParams {
  url: string;
  data: Record<string, any>;
  allBack?: boolean;
  [key: string]: any;
}

class Request {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  req(config: Config) {
    let p: Promise<Record<string, any>>;

    if (!config.url) {
      return Promise.reject('请求地址不能为空！');
    }

    config.url = this.baseUrl + config.url;
    config.header = {
      'Content-Type': 'application/json',
      'X-Auth-Token': 'Y5FCTqzEDyWpzPHWTbuQbAa5USpZZZ94VaqNEaOO',
    };

    p = new Promise((res, rej) => {
      Taro.request(config)
        .then((r) => {
          if (config.allBack) {
            res(r);

            return;
          }

          res(r);
        })
        .catch((err) => {
          if (typeof err === 'string') {
            Taro.showModal({
              title: '请求出错了',
              content: err,
            });
            rej(err);

            return;
          }
          Taro.showModal({
            title: '请求出错了',
          });
          rej('请求出错了');
        });
    });

    return p;
  }
}

const request = (function () {
  let instance: Request;

  return function () {
    if (!instance) {
      const baseUrl = 'https://www.yuque.com/api/v2';

      instance = new Request(baseUrl);
    }

    return instance;
  };
})();

export const useReq = (opt: Record<string, any> = {}) =>
  useRequest((p: Config) => p, {
    manual: true,
    requestMethod: (p) => request().req(p),
    ...opt,
  });

export default request();
