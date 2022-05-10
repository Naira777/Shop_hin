import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../reducers/userReducer";

const SigninScreen = (props) => {
  
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const redirect = props.location.search 
 ? props.location.search.split("=")[1]
 : '/';




  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }

  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(signin(email, password));
  };

  return (
    <div className="form">
      <form className="form-container" onSubmit={submitHandler}>
        <ul>
          <li>
            <h2>Sign In</h2>
          </li>

          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>

          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
          </li>

          <li>
            <label htmlFor="password">Password</label>

            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>

          <li>
            <button type="submit" className="button primary">
              Signin
            </button>
          </li>

          <li>New to Shop?</li>
          <li>
            <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center">
              Create your shop account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};
export default SigninScreen;
