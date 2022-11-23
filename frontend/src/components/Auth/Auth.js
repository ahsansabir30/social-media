import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from'@mui/material';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { AUTH } from '../../constants/actions';
import Input from './Input';
import Icon from './Icon';
import makeStyles from './styles';
import { signin,  signup } from '../../actions/auth'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Auth = () => {
    const classes = makeStyles();
    const dispatch = useDispatch();
    const history = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] =  useState(false);
    const [isSignup, setIsSignup] = useState(false) ;

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
      // stop the reload of the browser, when we submit the form
      e.preventDefault();

      if(isSignup){
        dispatch(signup(formData, history));
      }else{
        dispatch(signin(formData, history));
      }
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const googleSuccess = async (res) => {
        // by using ?. , it stops it throwing an error and says it undefined, as sometimes nothing is passed to the response
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
          dispatch({ type: AUTH, data: { result, token } });
          history.push('/');
        } catch (error) {
          console.log(error);
        }
    };

    const googleFailure = () => {
        console.log("Unsuccessful, try again")
    };

    return (
<Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} sx={{ my: 1 }}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
            clientId='282640101870-4kcict6ksv205eslsismp32or4nn7l63.apps.googleusercontent.com'
            render={(renderProps) => (
                <Button 
                    className={classes.googleButton} 
                    color='text' 
                    fullwidth 
                    onClick={renderProps.onClick} 
                    disabled={renderProps.disabled} 
                    startIcon={<Icon />} 
                    variant="contained"
                    sx={{ my: 1 }}
                >Google Login</Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end" >
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
    )
}

export default Auth