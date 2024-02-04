import React, { useEffect, useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';
import { commerce } from '../../../lib/commerce';
import { Link, useNavigate } from 'react-router-dom';

const steps = ['Shipping address', 'Payment details'];

function Checkout({ cart, order, handleCaptureCheckout, error }) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState('');
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart?.id, { type: 'cart' });
                //console.log(token);
                setCheckoutToken(token);

            } catch (error) {
                navigate('/')
            }
        }
        generateToken();
    }, [])

    const nextStep = () => setActiveStep((prev) => prev + 1);
    const backStep = () => setActiveStep((prev) => prev - 1);

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true);
        }, 3000);
    }

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant='h5'>Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant='subtitle2'>Order ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} to='/' variant='outlined' type='button'>Continue Shopping</Button>
        </>
    ) : isFinished ? (
        <>
            <div>
                <Typography variant='h5'>Thank you for your purchase!</Typography>
                <Divider className={classes.divider} />
            </div>
            <br />
            <Button component={Link} to='/' variant='outlined' type='button'>Continue Shopping</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )

    if (error) {
        <>
            <Typography variant='h5'>Error: {error}</Typography>
            <br />
            <Button component={Link} to='/' variant='outlined' type='button'>Continue Shopping</Button>
        </>
    }

    const Form = () => activeStep === 0 ?
        <AddressForm checkoutToken={checkoutToken} next={next} /> :
        <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} handleCaptureCheckout={handleCaptureCheckout} nextStep={nextStep} timeout={timeout} />;

    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h5' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout