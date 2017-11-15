import fetch from 'dva/fetch';
import {message} from 'antd';
import * as CONST from '../constants' ;

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function checkCode(res) {
  if (res && res.code) {
    if(res.code == 301) {
      sessionStorage.removeItem('accessToken');
      window.location.reload(true);
    } else if (res.code != 200) {
      const error = new Error(res.msg);
      error.res = res;
      message.error(res.msg);
      throw error;
    } else {
      if(res.msg){
        message.success(res.msg);
      }
    }
    return res;
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  let result;
  await fetch(CONST.BASIC_URL + url, options)
    .then(function (response) {
      checkStatus(response);
      return response.json()
    }).then(function (json) {
      checkCode(json);
      result = json;
      console.log('parsed json', json)
    }).catch(function (ex) {
      console.log('parsing failed', ex)
    });
  return result;
}
