import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import decode from 'jwt-decode';
import useStyles from './styles';
import * as actionType from '../../constants/actions';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch( {type: actionType.LOGOUT});
        history('/auth');
        // i.e. logouts the user, as the user is null
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;
        // checking if a token is active, as token expires every hour
        // if the user stays inactive it will logout the user from the page
        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp*1000 < new Date().getTime()) logout();

        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return(
        <AppBar className={classes.appBar} position="static" color="inherit" >
            <div className={classes.brandContainer}>
                <Typography component={Link} className={classes.heading} variant="h3" align="center" to="/posts">Type</Typography>
                <Toolbar className={classes.toolbar}>
                    {/* if the user exist, show something  */}
                    {/* else if the user does not exist, show something different*/}  
                    {user ? (
                        <div className={classes.profile}>
                            <Avatar alt={user.result.firstname} src={user.result.imageUrl}>{user.result.firstname.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user.result.firstname} {user.result.lastname} </Typography>
                            <Button variant='contained' className={classes.logout} colour="secondary" onClick={logout}>Logout</Button>
                        </div> 
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" colour="primary">Sign in</Button>
                    )}
                </Toolbar>
            </div>
        </AppBar>
    )
};

export default Navbar