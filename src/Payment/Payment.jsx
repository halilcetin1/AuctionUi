
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51Qx4DHPMCmX7dE1X8AaUG639AQWCVVedT3yKW2oFhMxrHh5os9hj5f84yCleu46fc7aTrPYVq2PpW3SJ50W717Hs00PgeKjjoo');
import CheckoutForm from './CheckOut';
import { useSelector } from 'react-redux';

export default function Payment() {


const {payresponse}=useSelector((state)=>state.payment)
const puplishkey=import.meta.env.VITE_Stripe_Publish_Key;

import.meta
const stripePromise=loadStripe("pk_test_51Qx4DHPMCmX7dE1X8AaUG639AQWCVVedT3yKW2oFhMxrHh5os9hj5f84yCleu46fc7aTrPYVq2PpW3SJ50W717Hs00PgeKjjoo")
const options = {
 
     // passing the client secret obtained from the server
     clientSecret: payresponse.clientSecret ,
   };

   
     
  return (
    <div className='mt-96'>
   <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
     
    </div>
  )
}
