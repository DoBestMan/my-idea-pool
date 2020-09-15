import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import AuthReducer from './auth';
import IdeaReducer from './idea';

export default (history) => combineReducers({
  router: connectRouter(history),
  auth: AuthReducer,
  idea: IdeaReducer,
});
