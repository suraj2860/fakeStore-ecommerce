import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Button } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import useStyles from './styles';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

function Navbar({ totalItems }) {
    const classes = useStyles();
    const location = useLocation();

    const [navigate, setNavigate] = useState(false);
    //const [name, setName] = useState('');


    // useEffect(() => {
    //     (async () => {
    //         try{
    //             const {data} = await axios.get('current-user');
    //             setName(data.username);
    //         } catch (error) {
    //             console.log(error);
    //             setNavigate(true);
    //         }
    //     })();
    // },[]);

    // const logout = async () => {
    //     await axios.post('logout', {}, { withCredentials: true });

    //     setNavigate(true);
    //     setIsLoggedIn(false);
    // }

    // if (navigate) {
    //     return (
    //         <>
    //         <Navbar />
    //         <Navigate to='/login' />
    //         </>
    //     );
    // }


    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
                        <img src={logo} alt="fakeStore" height='25px' className={classes.image} />
                        fakeStore
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.button} >
                        {location.pathname === '/' &&
                            <IconButton component={Link} to='/cart' aria-label='Show cart items' color='inherit'>
                                <Badge badgeContent={totalItems} color='secondary'>
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>}
                        {/* <Typography variant='subtitle1'>{name}</Typography> */}
                        {/* {location.pathname === '/login' && <Button component={Link} to='/register' variant="outlined">Register</Button>} */}
                        {!isAuthenticated && <Button onClick={loginWithRedirect} variant="outlined">Login</Button>}
                        {isAuthenticated && <Button variant="outlined" onClick={logout}>Logout</Button>}
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar