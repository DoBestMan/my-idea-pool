import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import configureStore, { history } from './store';
import theme from './styles/theme';
import Routes from './routes';

const store = configureStore();

function App() {
  return (
    <>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes />
          </ThemeProvider>
        </ConnectedRouter>
      </Provider>
    </>
  );
}

export default App;
