import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { useAuth0 } from '@auth0/auth0-react';


function Cart({ cart, handleUpdateCartQnty, handleRemoveFromCart, handleEmptyCart }) {
    const classes = useStyles();
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    const EmptyCart = () => (
        <Typography variant='subtitle1'>You have no items in you shopping cart, 
            <Link to='/' className={classes.link}> start adding some</Link>!
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart?.line_items.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <CartItem item={item} handleUpdateCartQnty={handleUpdateCartQnty} handleRemoveFromCart={handleRemoveFromCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant='h5'> Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} onClick={handleEmptyCart} size="medium" type="button" variant="contained" color="secondary" >Empty cart</Button>
                    {isAuthenticated && <Button component={Link} to='/checkout' className={classes.checkoutButton} size="medium" type="button" variant="contained" color="primary">Checkout</Button>}
                    {!isAuthenticated && <Button onClick={loginWithRedirect} className={classes.checkoutButton} size="medium" type="button" variant="contained" color="primary">Checkout</Button>}
                </div>
            </div>
        </>
    );

    if(!cart?.line_items) return 'Loading.....'

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant='h4' gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart