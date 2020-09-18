import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PublicRoute(props) {
  const { component: Component, ...rest } = props;
  const isLoggedIn = useSelector(state => !!state.auth.me);

  return (
    <Route
      {...rest}
      render={() => {
        if (isLoggedIn) return <Redirect to="/ideas" />;
        return <Component {...props} />;
      }}
    />
  );
}

export default PublicRoute;
