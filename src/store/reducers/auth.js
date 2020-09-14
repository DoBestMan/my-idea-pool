import { createAction, createReducer } from '@reduxjs/toolkit';

import {
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  GET_ACCOUNT_INFO_REQUEST,
} from '../types';
import { requestSuccess, requestFail, requestPending } from 'src/utils/api';


/**
 * Initial state
 */
const initialState = {
  me: null,
  status: 'INIT',
  error: null,
};

/**
 * Crate actions
 */
export const login = createAction(LOGIN_REQUEST);
export const signup = createAction(SIGNUP_REQUEST);
export const getAccountInfo = createAction(GET_ACCOUNT_INFO_REQUEST);

/**
 * Create reducers
 */
export default createReducer(initialState, {
  [requestSuccess(LOGIN_REQUEST)]: (state) => ({
    ...state,
    status: requestSuccess(LOGIN_REQUEST),
  }),

  [requestPending(LOGIN_REQUEST)]: (state) => ({
    ...state,
    status: requestPending(LOGIN_REQUEST),
  }),

  [requestFail(LOGIN_REQUEST)]: (state, { payload }) => ({
    ...state,
    me: null,
    status: requestFail(LOGIN_REQUEST),
    error: payload.error,
  }),

  [requestSuccess(SIGNUP_REQUEST)]: (state) => ({
    ...state,
    status: requestSuccess(SIGNUP_REQUEST),
  }),

  [requestFail(SIGNUP_REQUEST)]: (state, { payload }) => ({
    ...state,
    me: null,
    status: requestFail(SIGNUP_REQUEST),
    error: payload.error,
  }),

  [requestSuccess(GET_ACCOUNT_INFO_REQUEST)]: (state, { payload }) => ({
    ...state,
    me: payload,
    status: requestSuccess(GET_ACCOUNT_INFO_REQUEST),
  }),
});