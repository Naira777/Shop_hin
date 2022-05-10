import React, {  useState } from "react";
import { useDispatch } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShipping } from "../reducers/productReducers";



const ShippingScreen = (props) => {


 const dispatch = useDispatch();

  const [address, setAddress] = useState('');
   const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
   const [city, setCity] = useState('');


const submitHandler = (e) => {

e.preventDefault();

dispatch(saveShipping ({address, city, postalCode, country}));
props.history.push('/payment');
}


  return (<div> 

    <CheckoutSteps step1 step2 />
  
<div className="form">
      <form  className="form-container" onSubmit={submitHandler}>
        <ul> 
            
            <li>
            <h2>Shipping</h2>
          </li>

            <li>
            <label htmlFor="address">Name</label>
                   <input
            type="text"
            name="address"
            id="address"
            onChange={(e) => setAddress(e.target.value)}
          /> </li>
 
          <li>
            <label htmlFor="city">City</label>
                   <input
            type="text"
            name="city"
            id="city"
            onChange={(e) => setCity(e.target.value)}
          /> </li>
 
              <li>
            <label htmlFor="postalCode">Postal Code</label>
                   <input
            type="text"
            name="postalCode"
            id="postalCode"
            onChange={(e) => setPostalCode(e.target.value)}
          /> </li>
       <li>
            <label htmlFor="country">Country</label>
                   <input
            type="text"
            name="country"
            id="country"
            onChange={(e) => setCountry(e.target.value)}
          /> </li>
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
export default ShippingScreen;
