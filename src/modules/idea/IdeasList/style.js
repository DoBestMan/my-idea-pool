import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  tableRow: {
    '&:hover .actions': {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  dot: {
    fontSize: '12px',
  },
}));
