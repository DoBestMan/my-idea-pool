import axios from 'axios';
import { call, put } from 'redux-saga/effects';

export const requestSuccess = (type) => `${type}_SUCCESS`;

export const requestFail = (type) => `${type}_FAIL`;

export const requestPending = (type) => `${type}_PENDING`;

const defaultHeaders = () => {
  const tokens = localStorage.getItem('tokens');
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  axios.defaults.baseURL = process.env.REACT_APP_API_HOST;
  if (tokens) {
    headers['X-Access-Token'] = `Bearer ${JSON.parse(tokens)['jwt']}`;
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
    } catch (err) {
      fail && fail(err);
      yield put({
        type: requestFail(type),
        payload: { err: err.response.data.err },
      });
      failCallback && failCallback(err.response.data);
    } finally {
      finalCallback && finalCallback();
    }
  };
