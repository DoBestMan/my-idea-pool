import { takeLatest } from 'redux-saga/effects';

import {
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  GET_ACCOUNT_INFO_REQUEST,
  LOGOUT_REQUEST,
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

const logout = request({
  type: LOGOUT_REQUEST,
  method: 'delete',
  path: '/access-tokens',
  success: (res) => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },
});

export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(SIGNUP_REQUEST, signup);
  yield takeLatest(GET_ACCOUNT_INFO_REQUEST, getAccountInfo);
  yield takeLatest(LOGOUT_REQUEST, logout);
}
