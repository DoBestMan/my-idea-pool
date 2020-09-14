import { call, put } from 'redux-saga/effects';

import axios from './axios';

export const requestSuccess = (type) => `${type}_SUCCESS`;

export const requestFail = (type) => `${type}_FAIL`;

export const requestPending = (type) => `${type}_PENDING`;

const defaultHeaders = () => {
  const token = localStorage.getItem('token');
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['x-access-token'] = token;
  }

  return headers;
};

export default ({
  type,
  method,
  path,
  headers,
  success,
  fail,
  payloadOnSuccess,
}) =>
  function* (action) {
    const {
      body,
      params,
      success: successCallback,
      fail: failCallback,
      final: finalCallback,
    } = action.payload || {};

    try {
      yield put({
        type: requestPending(type),
      });

      const response = yield call(axios.request, {
        url: typeof path === 'function' ? path(action) : path,
        method: method.toLowerCase(),
        headers: Object.assign({}, defaultHeaders(), headers),
        data: body,
        params,
      });

      success && success(response.data, action);

      yield put({
        type: requestSuccess(type),
        payload: payloadOnSuccess
          ? payloadOnSuccess(response.data, action)
          : response.data,
      });

      successCallback && successCallback(response);
    } catch (error) {
      fail && fail(error);
      yield put({
        type: requestFail(type),
        payload: { error: error.response.data },
      });
      failCallback && failCallback(error.response.data);
    } finally {
      finalCallback && finalCallback();
    }
  };
