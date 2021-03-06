import fetch from 'dva/fetch'
import {notification} from "antd";

// function parseJSON(response) {
//     return response.json()
// }
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
// export default function request(url, options) {
//   return fetch(url, options)
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(data => ({ data }))
//     .catch(err => ({ err }));
// }

function filter(str) { // 特殊字符转义
  if (!str) {
    str = '';
  }
  str += ''; // 隐式转换
  str = str.replace(/%/g, '%25');
  str = str.replace(/\+/g, '%2B');
  str = str.replace(/ /g, '%20');
  str = str.replace(/\//g, '%2F');
  str = str.replace(/\?/g, '%3F');
  str = str.replace(/&/g, '%26');
  str = str.replace(/\=/g, '%3D');
  str = str.replace(/#/g, '%23');
  return str;
}

function formateObjToParamStr(paramObj) {
  if (!paramObj) {
    return "";
  }
  const sdata = [];
  for (let attr in paramObj) {

    sdata.push(`${attr}=${filter(paramObj[attr])}`);
  }
  return sdata.join('&');
};

const headers = {
  'Content-Type': 'application/json'
};

const credentials = "include";


async function request(url, method, params) {

  let response = {};

  // get请求
  if ("get" === method.toLowerCase()) {
    const urlParams = formateObjToParamStr(params);
    url = url + "?" + urlParams;
    response = await fetch(url, {
      credentials: credentials,
      headers: headers,
    });
  }
  // post请求
  if ("post" === method.toLowerCase()) {
    response = await fetch(url, {
      method: method,
      credentials: credentials,
      headers: headers,
      body: JSON.stringify(params)
    });
  }

  //delete请求
  if ("delete" === method.toLowerCase()) {
    url = url + "?" + formateObjToParamStr(params);
    response = await fetch(url, {
      method: method,
      credentials: credentials,
      headers: headers,
    });
  }

  //更新请求
  if ("put" === method.toLowerCase()) {
    response = await fetch(url, {
      method: method,
      credentials: credentials,
      headers: headers,
      body: JSON.stringify(params)
    });
  }


  checkStatus(response);
  let data = await response.text();
  // json数据
  if (data.startsWith("{") || data.startsWith("[")) {
    data = JSON.parse(data);
  }
  return {
    data,
    headers: {}
  };
}

export default request
