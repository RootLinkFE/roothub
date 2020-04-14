import axios from 'axios';
import qs from 'query-string';
import JSONP from 'jsonp';
import ExtendableError from 'es6-error';
import { notification } from 'antd';
export class APIError extends ExtendableError {
  constructor(message = '') {
    super(message);
  }
}

const VALID_IP_REGEXP = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])/; // tslint:disable-line
const VALID_HOST_REGEXP = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])/; // tslint:disable-line
export const getAPIPrefix = str => {
  let val = str || '/';
  if (typeof val === 'string') {
    if (/^https?:/.test(val)) {
      val = val.replace(/^(https?:)/, protocol);
    } else {
      if (VALID_IP_REGEXP.test(val) || VALID_HOST_REGEXP.test(val)) {
        val = `${protocol}//${val}`;
      } else {
        val = val.replace(/^([^/.])/, '/$1');
      }
    }
    val = val.replace(/([^/])$/, '$1/');
  }
  return val;
};
export const getAPIUrl = (prefix, endpoint) => {
  const url = `${prefix}/${endpoint}`;
  const re = new RegExp(
    `/+(${endpoint.replace(/^\/+/, '').replace(/\?.*$/, '')})`,
  );
  return url.replace(re, '/$1');
};
const noop = () => {};
const { protocol } = window.location;
const { CancelToken } = axios;
/**
 * 传入 API 接口的 host 地址，生成一个 API 实例，你可以用这个实例去进行各种 CURD 请求
 *
 * ```js
 * const api = createAPI(process.env.MUJI_APP_API_BASE);
 * const fetchData = async () => {
 *   const data = await api.getJSON('/orders'); // 发起 GET 请求
 *   console.log(data);
 * }
 * ```
 *
 * 默认 createAPI 会将返回结果按搜车标准返回体进行解包，即只返回 `{success: true, data: {...}, code: xxx, msg: xxx}`
 * 中的 data 字段，如果你想要判断接口返回是否成功，可以在 catch 里进行逻辑判断
 * ```js
 * const update = (data) => {
 *   api
 *     .postJSON('/orders', data, {
 *       showNotification: false // 禁用掉默认的错误提示
 *     })
 *     .then((resp) => {
 *       // 请求成功
 *     })
 *     .catch((err) => {
 *       // 请求失败
 *     })
 * }
 * ```
 *
 * @param {string} host 接口 host
 * @param {IRequestConfig} apiConfig 接口请求设置
 */
const createAPI = (host, apiConfig = {}) => {
  const prefix = getAPIPrefix(host);

  function request(endpoint, reqConfig = {}) {
    const config = {
      ...apiConfig,
      ...reqConfig,
    };
    const {
      showNotification = true,
      handleOption,
      handleResp = resp => resp.data,
      ...reqOpts
    } = config;
    const url = getAPIUrl(prefix, endpoint);
    let cancel = noop;
    let opts = {
      withCredentials: true,
      cancelToken: new CancelToken(c => (cancel = c)),
      ...reqOpts,
    };
    if (handleOption) {
      opts = handleOption(opts) || opts;
    }
    const promise = axios(url, opts)
      .then(checkStatus)
      .then(resp => resp.data)
      .then(checkResp)
      .then(resp => handleResp(resp))
      .catch(err => {
        if (axios.isCancel(err)) {
          console.warn(`请求取消：${endpoint}`);
          return;
        }
        throw err;
      });
    promise.promise = promise;
    promise.cancel = cancel;
    return promise;

    function checkStatus(resp) {
      if (resp.status >= 200 && resp.status < 300) {
        return resp;
      }
      if (showNotification) {
        notification.error({
          message: `请求错误 ${resp.status}: ${resp.config.url}`,
          description: resp.statusText,
        });
      }
      throw new APIError(`[${resp.status}] 请求错误 ${resp.config.url}`);
    }

    function checkResp(data) {
      if (data.success) {
        return data;
      }
      if (showNotification) {
        notification.error({
          message: `请求失败 ${data.code}: ${url}`,
          description: data.msg,
        });
      }
      throw new APIError(`[${data.code}] 请求失败 ${data.msg}`);
    }
  }
  /**
   * 发起 GET 请求
   *
   * @param {string} endpoint
   * @param {Record<string, string | number>} data
   * @param {IRequestConfig} config
   */

  function getJSON(endpoint, data = {}, config) {
    return request(endpoint, {
      ...config,
      method: 'get',
      params: data,
    });
  }
  /**
   * 发起 POST 请求
   *
   * @param {string} endpoint
   * @param {Record<string, string | number>} data
   * @param {IRequestConfig} config
   */

  function postJSON(endpoint, data = {}, config) {
    return request(endpoint, {
      ...config,
      method: 'post',
      data,
    });
  }
  /**
   * 以表单形式发起 post 请求，通常用来上传文件
   *
   * 如何使用 postForm 上传文件：
   *
   * ```js
   * const input = document.createElement('input');
   * input.type = 'file';
   * input.click();
   * input.addEventListener('change', () => {
   *   // file 对象代表你从浏览器里选取的文件对象，获取 file 对象的形式多种多样，你也可以使用 antd Upload 组件获取 file 对象
   *   const file = input.files[0];
   *   const formData = new FormData();
   *   formData.append('file', file);
   *   api.postForm('upload', formData);
   * });
   * ```
   *
   * @param {string} endpoint
   * @param {FormData | Record<string, string | number>} data
   * @param {IRequestConfig} config
   */

  function postForm(endpoint, data = {}, config) {
    return request(endpoint, {
      ...config,
      method: 'post',
      data: data instanceof FormData ? data : qs.stringify(data),
    });
  }
  /**
   *
   * @param {string} endpoint
   * @param {Record<string, File>} files
   * @param {IRequestConfig} config
   */

  function postFile(endpoint, files, config) {
    const isFile = f => Object.prototype.toString.call(f) === '[object File]';
    const fd = new FormData();
    Object.keys(files).forEach(k => {
      if (!isFile(files[k]))
        throw new Error('postFile 方法只接受值为 File 对象的键值对作为参数！');
      fd.append(k, files[k]);
    });
    return postForm(endpoint, fd, config);
  }
  /**
   *
   * @param {string} endpoint
   * @param {Record<string, string | number>} data
   * @param {IRequestConfig} config
   */

  function putJSON(endpoint, data = {}, config) {
    return request(endpoint, {
      ...config,
      method: 'put',
      data,
    });
  }
  /**
   *
   * @param {string} endpoint
   * @param {Record<string, string | number>} data
   * @param {IRequestConfig} config
   */

  function patchJSON(endpoint, data = {}, config) {
    return request(endpoint, {
      ...config,
      method: 'patch',
      data,
    });
  }
  /**
   *
   * @param {string} endpoint
   * @param {Record<string, string | number>} data
   * @param {IRequestConfig} config
   */

  function deleteJSON(endpoint, data = {}, config) {
    return request(endpoint, {
      ...config,
      method: 'delete',
      data,
    });
  }

  function jsonp(endpoint, params = {}, config = {}) {
    const {
      handleResp = resp => resp.data,
      showNotification = 'true',
    } = config;
    return new Promise((resolve, reject) => {
      let url = `${protocol}//${host}/${endpoint}`;
      if (params) url += `?${qs.stringify(params)}`;
      JSONP(
        url,
        {
          prefix: `__${host.replace(/[^\w\d]/g, '')}`,
        },
        (err, resp) => {
          if (err) return reject(err);
          if (!resp.success) {
            if (showNotification) {
              notification.error({
                message: `请求失败 ${resp.code}: ${url}`,
                description: resp.msg,
              });
            }
            return reject(new APIError(`[${resp.code}] 请求失败 ${resp.msg}`));
          }
          resolve(handleResp(resp));
        },
      );
    });
  }
  /**
   * 获取 API 接口 url
   *
   * @param {string} endpoint
   */

  function resovleUrl(endpoint) {
    return getAPIUrl(prefix, endpoint);
  }
  return {
    resovleUrl,
    request,
    getJSON,
    postJSON,
    postForm,
    postFile,
    putJSON,
    patchJSON,
    deleteJSON,
    jsonp,
  };
};
export default createAPI;
