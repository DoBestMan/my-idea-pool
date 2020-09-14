import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    paddingBottom: '200px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
  },
  title: {
    textAlign: 'center',
    fontSize: '40px',
  },
  error: {
    marginTop: '12px',
    fontSize: '12px',
    lineHeight: '13px',
  },
  submit: {
    padding: '9px 52px 12px',
    textTransform: 'capitalize',
  },
  link: {
    marginLeft: '4px',
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
}));