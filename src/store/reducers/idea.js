import { createAction, createReducer } from '@reduxjs/toolkit';

import {
  GET_IDEAS_REQUEST,
  CREATE_IDEA_REQUEST,
  UPDATE_IDEA_REQUEST,
  DELETE_IDEA_REQUEST,
  ADD_NEW_IDEA,
  DISCARD_NEW_IDEA,
  UPDATE_FIELD,
  SET_IDEA,
} from '../types';
import { requestSuccess, requestFail, requestPending } from 'src/utils/api';


/**
 * Initial state
 */
const initialState = {
  ideas: [],
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
export const updateField = createAction(UPDATE_FIELD);
export const setIdea = createAction(SET_IDEA);

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

  [requestSuccess(CREATE_IDEA_REQUEST)]: (state, { payload }) => {
    state.ideas[0] = payload;
    state.idea = null;
    state.status = requestSuccess(CREATE_IDEA_REQUEST);
  },

  [requestFail(CREATE_IDEA_REQUEST)]: (state, { payload }) => ({
    ...state,
    ideas: state.ideas.slice(1),
    idea: null,
    status: requestFail(CREATE_IDEA_REQUEST),
    error: payload.error,
  }),

  [requestSuccess(UPDATE_IDEA_REQUEST)]: (state, { payload }) => {
    const index = state.ideas.findIndex((idea) => idea.id === payload.id);
    if (index < 0) return;

    state.ideas[index] = payload;
    state.idea = null;
    state.status = requestSuccess(UPDATE_IDEA_REQUEST);
  },

  [requestFail(UPDATE_IDEA_REQUEST)]: (state, { payload }) => ({
    ...state,
    idea: null,
    status: requestFail(UPDATE_IDEA_REQUEST),
    error: payload.error,
  }),

  [requestSuccess(DELETE_IDEA_REQUEST)]: (state, { payload }) => {
    const index = state.ideas.findIndex((idea) => idea.id === payload.id);
    if (index < 0) return;
    state.ideas.splice(index, 1);
    state.status = requestSuccess(DELETE_IDEA_REQUEST);
  },

  [requestFail(DELETE_IDEA_REQUEST)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_IDEA_REQUEST),
    error: payload.error,
  }),

  [ADD_NEW_IDEA]: (state, { payload }) => {
    state.ideas.unshift(payload);
    state.idea = payload;
  },

  [DISCARD_NEW_IDEA]: (state) => {
    state.ideas.shift();
    state.idea = null;
  },

  [UPDATE_FIELD]: (state, { payload: { key, value } }) => {
    state.idea[key] = value;
  },

  [SET_IDEA]: (state, { payload }) => {
    state.idea = payload;
  },
});