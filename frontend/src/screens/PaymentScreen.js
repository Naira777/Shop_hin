import React, {  useState } from "react";
import { useDispatch } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import {savePayment} from '../reducers/productReducers';



const PaymentScreen = (props) => {


 const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState('');



const submitHandler = (e) => {

e.preventDefault();

dispatch(savePayment({paymentMethod}));
props.history.push('/placeorder');
}


  return (<div> 

    <CheckoutSteps step1 step2  step3 />
  
<div className="form">
      <form  className="form-container" onSubmit={submitHandler}>
        <ul> 
            
            <li>
            <h2>Payment</h2>
          </li>

            <li>  
                    <input
            type="radio"
            name="paymentMethod"
            id="paymentMethod"
            value="paypal"
            onChange={(e) => setPaymentMethod(e.target.value)} />
            <label htmlFor="paymentMethod">Paypal</label>
          
                        </li>
             <li>
            <button  type="submit" className="button primary">
              Continue
            </button>
            </li>  
        </ul>
      </form>
    </div>
  
   </div>
  );
};
export default PaymentScreen;
