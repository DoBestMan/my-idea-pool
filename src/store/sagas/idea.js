import { takeLatest } from 'redux-saga/effects';

import {
  GET_IDEAS_REQUEST,
} from '../types';
import request  from 'src/utils/api';

const getIdeas = request({
  type: GET_IDEAS_REQUEST,
  method: 'get',
  path: '/ideas',
});

export default function* authSaga() {
  yield takeLatest(GET_IDEAS_REQUEST, getIdeas);
}
