import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  logoContainer: {
    padding: '0 42px',
  },
  divider: {
    marginTop: '40px',
    marginBottom: '36px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main,
  },
  content: {
    height: '100vh',
    flexGrow: 1,
    padding: '41px 78px',
  },
  logout: {
    color: 'rgba(42, 56, 66, 0.65)',
    cursor: 'pointer',
  }
}));

export default useStyles;
