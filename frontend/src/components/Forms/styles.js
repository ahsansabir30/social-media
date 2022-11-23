import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '10px',
    padding: '10px'
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    padding: '100px',
    marginBottom: 10,
  },
  paper:{
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
  }
}));