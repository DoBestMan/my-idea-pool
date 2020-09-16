import { createAction, createReducer } from '@reduxjs/toolkit';

import {
  GET_IDEAS_REQUEST,
  CREATE_IDEA_REQUEST,
  UPDATE_IDEA_REQUEST,
  DELETE_IDEA_REQUEST,
  ADD_NEW_IDEA,
  DISCARD_NEW_IDEA,
} from '../types';
import { requestSuccess, requestFail, requestPending } from 'src/utils/api';


/**
 * Initial state
 */
const initialState = {
  ideas: [],
  idea: null,
  status: 'INIT',
  error: null,
};

/**
 * Crate actions
 */
export const getIdeas = createAction(GET_IDEAS_REQUEST);
export const createIdea = createAction(CREATE_IDEA_REQUEST);
export const updateIdea = createAction(UPDATE_IDEA_REQUEST);
export const deleteIdea = createAction(DELETE_IDEA_REQUEST);
export const addNewIdea = createAction(ADD_NEW_IDEA);
export const discardNewIdea = createAction(DISCARD_NEW_IDEA);

/**
 * Create reducers
 */
export default createReducer(initialState, {
  [requestSuccess(GET_IDEAS_REQUEST)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_IDEAS_REQUEST),
    ideas: payload,
  }),

  [requestPending(GET_IDEAS_REQUEST)]: (state) => ({
    ...state,
    status: requestPending(GET_IDEAS_REQUEST),
  }),

  [requestFail(GET_IDEAS_REQUEST)]: (state, { payload }) => ({
    ...state,
    ideas: [],
    status: requestFail(GET_IDEAS_REQUEST),
    error: payload.error,
  }),

  [ADD_NEW_IDEA]: (state, { payload }) => {
    state.ideas.unshift(payload);
  },

  [DISCARD_NEW_IDEA]: (state) => {
    state.ideas.shift();
  },
});