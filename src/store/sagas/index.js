import { all } from 'redux-saga/effects';

import auth from './auth';
import idea from './idea';

export default function* rootSaga () {
  yield all([
    auth(),
    idea(),
  ]);
};
