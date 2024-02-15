import React from 'react'
import Review from './Review'
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(String(import.meta.env.VITE_STRIPE_PUBLIC_KEY));

function PaymentForm({ checkoutToken, shippingData, backStep, handleCaptureCheckout, nextStep, timeout }) {
  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();

    if (!elements || !stripe) return;

    const cardElement = elements.getElement(CardElement);

    //const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    // if (error) {
    //   console.log(error);
    // } else {
      const orderData = {
        line_item: checkoutToken.line_item,
        customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
        shipping: {
          name: 'primary',
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'test_gateway',
          card: {
            number: '4242424242424242',
            expiry_month: '02',
            expiry_year: '24',
            cvc: '123',
            postal_zip_code: '94107',
          },
        },
      }
      handleCaptureCheckout(checkoutToken.id, orderData);
      //timeout();
      nextStep();
    // }
  }

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      {/* <Typography variant='h6' gutterBottom style={{ margin: '20px 0' }}>Payment Method</Typography> */}
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /><br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='outlined' onClick={backStep}>Back</Button>
                <Button type='submit' variant='contained' disabled={!stripe} color='primary'>
                  Pay {checkoutToken.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentForm