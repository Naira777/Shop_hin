import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { useDispatch, useSelector } from "react-redux";
import ProductsScreen from "./screens/ProductsScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
 import {signout} from './reducers/userReducer';




function App() {

 const userSignin = useSelector(state=> state.userSignin);
const {userInfo} = userSignin;
const dispatch = useDispatch();

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

const LogoutHandler = () => {

dispatch(signout());

}
  

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to ="/"> Gallery shop</Link>
          </div>

          <div className="header-links">
            <a href="Cart"> Cart</a> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cart4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
</svg>{<p> </p>}
                    
         {   userInfo
            
             ?  <p><Link to="/profile">{userInfo.name}</Link> <Link to ="/" onClick={LogoutHandler} >- Signout</Link> </p>
               
             :  <Link to="/signin"> Sign In </Link>

         }
          
         
           
          </div>
        </header>

        <aside className="sidebar">
          <h3> Categories </h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <a href="index.html">Paintings</a>
            </li>

       
          </ul>
        </aside>

        <main class="main">
          <div className="content">
            <Route path="/signin" component={SigninScreen } />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/payment" component={PaymentScreen } />
             <Route path="/shipping" component={ShippingScreen } />
             <Route path="/order/:id" component={OrderScreen } />
            <Route path="/register" component={RegisterScreen } />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen } />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">All rights reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

 //sa menq enq dzerqov grum, mer backendi hascen
 //"proxy":"http://127.0.0.1:5000",  sa grum enq pakage.jsoni mej fronti