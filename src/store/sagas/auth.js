import { takeLatest } from 'redux-saga/effects';

import {
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  GET_ACCOUNT_INFO_REQUEST,
} from '../types';
import request  from 'src/utils/api';

const login = request({
  type: LOGIN_REQUEST,
  method: 'post',
  path: '/access-tokens',
  success: (res) => {
    localStorage.setItem('token', res.jwt);
    localStorage.setItem('refreshToken', res.refresh_token);
  },
});

const signup = request({
  type: SIGNUP_REQUEST,
  method: 'post',
  path: '/users',
  success: (res) => {
    localStorage.setItem('token', res.jwt);
    localStorage.setItem('refreshToken', res.refresh_token);
  },
});

const getAccountInfo = request({
  type: GET_ACCOUNT_INFO_REQUEST,
  method: 'get',
  path: '/me',
});

export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(SIGNUP_REQUEST, signup);
  yield takeLatest(GET_ACCOUNT_INFO_REQUEST, getAccountInfo);
}
