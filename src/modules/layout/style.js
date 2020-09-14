import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  logoContainer: {
    padding: '37px 68px 0',
  },
  divider: {
    backgroundColor: theme.palette.secondary.main,
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
}));

export default useStyles;
