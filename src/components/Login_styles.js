const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '500px',
    minWidth: '250px',
  },
  paper: {
    marginTop:  theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    padding:  theme.spacing(3),
  },
  form: {
    marginBottom: theme.spacing(2),
  },
  submitBtn: {
    marginTop: theme.spacing(3),
  },
  link: {
    textDecoration: 'none',
    color: '#2980b9',
    marginTop: theme.spacing(1),
  }
});

export default styles;