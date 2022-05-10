import Axios from "axios";
import Cookie from 'js-cookie';

const USER_SIGNIN_REQUEST = 'USER_SIGNIN_REQUEST';
const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS';
const USER_SIGNIN_FAIL = 'USER_SIGNIN_FAIL';
const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL';

const USER_SIGNOUT_REQUEST = 'USER_SIGNOUT_REQUEST';

function userSigninReducer(state= {}, action) {
   switch(action.type){

  case USER_SIGNIN_REQUEST:
      return { loading: true };

      case USER_SIGNIN_SUCCESS:
   return { loading: false, userInfo: action.payload };

   case USER_SIGNIN_FAIL:
       return {loading: false, error: action.payload };

    case USER_SIGNOUT_REQUEST:
    
    return {userInfo: action.payload };
    
       default: 
       return state;
       
   }

}


function userRegisterReducer(state= {}, action) {
   switch(action.type){

  case USER_REGISTER_REQUEST:
      return { loading: true };

      case USER_REGISTER_SUCCESS:
   return { loading: false, userInfo: action.payload };

   case USER_REGISTER_FAIL:
       return {loading: false, error: action.payload };

       default: return state;
       
   }

}



const register = (name, email, password) => async (dispatch) => {


try {

dispatch ({ type: USER_REGISTER_REQUEST, payload: {name, email, password}});
const {data} = await Axios.post('api/users/register', {name, email, password});

dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

Cookie.set("userInfo", JSON.stringify(data));
// verevi grvac cooki mijocov ete pakenq appn ev noric bacenq infon kpahi

}
catch(error){

    dispatch({ type: USER_REGISTER_FAIL, payload: error.message});
}
}




const signin = (email, password) => async (dispatch) => {

try {
    

dispatch ({ type: USER_SIGNIN_REQUEST, payload: {email, password}});


const {data} = await Axios.post('/api/users/signin', {email, password});

dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

Cookie.set("userInfo", JSON.stringify(data));
// verevi grvac cooki mijocov ete pakenq appn ev noric bacenq infon kpahi

}
catch(error){

    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message});
}
}



const signout = () =>  (dispatch) => {

 

dispatch ({ type: USER_SIGNOUT_REQUEST, payload: null });

Cookie.set("userInfo", null);
// verevi grvac cooki mijocov ete pakenq appn ev noric bacenq infon kpahi

}



export   { userSigninReducer, userRegisterReducer, signin , register, signout };