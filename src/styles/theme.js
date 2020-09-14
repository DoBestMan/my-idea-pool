import { createMuiTheme } from '@material-ui/core';

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      light: 'rgba(0, 168, 67, 1)',
      main: 'rgba(0, 168, 67, 1)',
      dark: 'rgba(0, 168, 67, 1)',
      contrastText: '#ffffff',
    },
    secondary: {
      ligh: 'rgba(42, 56, 66, 0.4)',
      main: 'rgba(42, 56, 66, 0.4)',
      dark: 'rgba(42, 56, 66, 0.65)',
      contrastText: '#000000',
    },
    error: {
      light: '#E96A6A',
      main: '#E96A6A',
      dark: '#E96A6A',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 0,
        boxShadow: 'none',
      },
    },
  },
});

export default defaultTheme;