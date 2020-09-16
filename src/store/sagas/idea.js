import { takeLatest } from 'redux-saga/effects';

import {
  GET_IDEAS_REQUEST,
  CREATE_IDEA_REQUEST,
  UPDATE_IDEA_REQUEST,
  DELETE_IDEA_REQUEST,
} from '../types';
import request  from 'src/utils/api';

const getIdeas = request({
  type: GET_IDEAS_REQUEST,
  method: 'get',
  path: '/ideas',
});

const createIdea = request({
  type: CREATE_IDEA_REQUEST,
  method: 'post',
  path: '/ideas',
});

const updateIdea = request({
  type: UPDATE_IDEA_REQUEST,
  method: 'put',
  path: ({ payload }) => `/ideas/${payload.id}`,
});

const deleteIdea = request({
  type: DELETE_IDEA_REQUEST,
  method: 'delete',
  path: ({ payload }) => `/ideas/${payload.id}`,
  payloadOnSuccess: (_, action) => action.payload,
});

export default function* authSaga() {
  yield takeLatest(GET_IDEAS_REQUEST, getIdeas);
  yield takeLatest(CREATE_IDEA_REQUEST, createIdea);
  yield takeLatest(UPDATE_IDEA_REQUEST, updateIdea);
  yield takeLatest(DELETE_IDEA_REQUEST, deleteIdea);
}
