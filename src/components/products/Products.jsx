import React,{useState, useEffect} from 'react'
import { Grid } from '@material-ui/core';
import axios from 'axios';
import Product from './Product/Product';
import useStyles from './styles';
import {Navigate} from 'react-router-dom';


// const products = [
//     { id: 1, name: 'Shoes', description: 'Running shoes', price: '$5', image: 'https://www.run4it.com/cdn/shop/products/DO7625-200-M-Nike-AirZoomPegasus39Shield-side2_952x952.jpg?v=1663661938' },
//     { id: 2, name: 'Macbook', description: 'Apple macbook', price: '$10', image: 'https://m.media-amazon.com/images/I/71vFKBpKakL._AC_UF1000,1000_QL80_.jpg' }
// ];

const Products = ({ products, onAddToCart }) => {
    const classes = useStyles();
    
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justifyContent="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </main>
    );
}

export default Products