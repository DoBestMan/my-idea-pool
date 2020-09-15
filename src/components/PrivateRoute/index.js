import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute (props) {
  const { component: Component, ...rest } = props;
  const isLoggedIn = useSelector(state => !!state.auth.me);

  return (
    <Route
      {...rest}
      render={() => {
        if (isLoggedIn) return <Component {...props} />;
        return <Redirect to="/login" />;
      }}
    />
  );
}

export default PrivateRoute;
