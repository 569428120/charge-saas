import fetch from 'dva/fetch'

// function parseJSON(response) {
//     return response.json()
// }

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error
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
