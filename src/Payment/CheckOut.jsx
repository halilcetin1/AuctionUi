import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addPayHistory } from '../Redux/Slices/paymentSlice';

import { toast } from 'react-toastify';



const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
const navigate=useNavigate()
const dispatch=useDispatch()

const  p=useSelector((state)=>state.payment)
const payresponse=p.payresponse;
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      
      return;
    }



    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/confirmedpay",
      },
      redirect:"if_required"
    });
   
    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log("odeme hatası",result.error.message);
    } else {
if(result.paymentIntent.status=="succeeded"){

  const model={
    vehicleId: payresponse.vehicleId,
    userId: payresponse.userId,
    clientSecret: payresponse.clientSecret,
    stripePaymentIntentId: payresponse.stripePaymentIntentId
  }
dispatch(addPayHistory(model)).unwrap().then((e)=>{
  toast.success("Ödemeniz gerçekleşti.")
navigate("/confirmedpay",{state:{payresponse}})



}).catch((e)=>{
  console.log(e);
  
})

  


}
  
    
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
     
      <PaymentElement  />
      <button disabled={!stripe} className='text-white bg-blue-500 p-2 rounded-md'>Submit</button>
    </form>
  )
};

export default CheckoutForm;