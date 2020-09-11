import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { getAccountInfo } from 'src/store/reducers/auth';

const LoginPage = lazy(() => import('../modules/auth/Login'));

function Routes() {
  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => !!state.auth.me);

  useEffect(() => {
    dispatch(getAccountInfo({
      final: () => setIsLoaded(true),
    }));
  }, [dispatch]);

  return isLoaded ? (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" render={() => {
          if (isLoggedIn) return <Redirect to="/ideas" />;
          return <Redirect to="/login" />;
        }} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Suspense>
  ) : <div>Loading...</div>;
}

export default Routes;
