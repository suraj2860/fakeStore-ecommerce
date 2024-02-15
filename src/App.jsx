import React, { useEffect, useState, useContext } from 'react'
import { commerce } from './lib/commerce';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Products, Navbar, Cart, Checkout } from './components';
import Register from './components/Register';
import Login from './components/Login';
import axios from 'axios';



function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  // const [currentUser, setCurrentUser] = useState(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity) => {
    const cart = await commerce.cart.add(productId, quantity);
    setCart(cart);
  }

  const handleUpdateCartQnty = async (productId, quantity) => {
    const cart = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  }

  const handleRemoveFromCart = async (productId) => {
    const cart = await commerce.cart.remove(productId);
    setCart(cart);
  }

  const handleEmptyCart = async () => {
    const cart = await commerce.cart.empty();
    setCart(cart);
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  }

//   const fetchCurrentUser = async () => {
//     const response = await axios.get('current-user', {withCredentials: true});
  
//     console.log(response);
//     if (response.data.success === true) {
//       setCurrentUser(response.data.data.username);
//       setIsLoggedIn(true);
//     } 
// };

  useEffect(() => {
    fetchProducts();
    fetchCart();
    //fetchCurrentUser();
  }, []);
  

  return (
    <BrowserRouter>
      <div>
      <Navbar totalItems={cart?.total_items} />
          <Routes>
            {/* <Route path='/register' element={isLoggedIn ? <Navigate to='/' /> : <Register />}></Route>
            <Route path='/login' element={isLoggedIn ? <Navigate to='/' /> : <Login />}></Route> */}
            <Route path='/' element={<Products products={products} onAddToCart={handleAddToCart} />}>
            </Route>
            <Route path='/cart' element={<Cart
              cart={cart}
              handleUpdateCartQnty={handleUpdateCartQnty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart} />}>
            </Route>
            <Route path='/checkout' element={<Checkout cart={cart} order={order} handleCaptureCheckout={handleCaptureCheckout} error={errorMessage} />}>
            </Route>
          </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App