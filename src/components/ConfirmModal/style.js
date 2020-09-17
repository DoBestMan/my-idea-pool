import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, .1)',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '400px',
    transform: 'translate(-50%, -50%)',
    padding: '30px 30px 20px',
    fontSize: '16px',
    textAlign: 'center',
    boxShadow: '0 0 20px 0 rgba(0,0,0,0.30)',
    borderRadius: '3px',
    backgroundColor: '#ffffff',
  },
  modalContent: {
    margin: '36px 0 72px',
  },
  button: {
    width: '50%',
  },
}));
