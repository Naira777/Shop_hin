import Axios from "axios";
import axios from "axios";
import Cookie from "js-cookie";

 const ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST';
 const ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS';
 const ORDER_CREATE_FAIL = 'ORDER_CREATE_FAIL';

const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
const PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL";

const PRODUCT_DETAILS_REQUEST = "PRODUCT_DETAILS_REQUEST";
const PRODUCT_DETAILS_SUCCESS = "PRODUCT_DETAILS_SUCCESS";
const PRODUCT_DETAILS_FAIL = "PRODUCT_DETAILS_FAIL";
const CART_ADD_ITEM = "CART_ADD_ITEM";
const CART_REMOVE_ITEM = "CART_REMOVE_ITEM";

const PRODUCT_SAVE_REQUEST = "PRODUCT_SAVE_REQUEST";
const PRODUCT_SAVE_SUCCESS = "PRODUCT_SAVE_SUCCESS";
const PRODUCT_SAVE_FAIL = "PRODUCT_SAVE_FAIL";

const PRODUCT_DELETE_REQUEST = "PRODUCT_DELETE_REQUEST";
const PRODUCT_DELETE_SUCCESS = "PRODUCT_DELETE_SUCCESS";
const PRODUCT_DELETE_FAIL = "PRODUCT_DELETE_FAIL";

const CART_SAVE_SHIPPING = "CART_SAVE_SHIPPING";
const CART_SAVE_PAYMENT = "CART_SAVE_PAYMENT";

 const ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST';
 const ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS';
 const ORDER_DETAILS_FAIL = 'ORDER_DETAILS_FAIL';
 
 const ORDER_PAY_REQUEST = 'ORDER_PAY_REQUEST';
 const ORDER_PAY_SUCCESS = 'ORDER_PAY_SUCCESS';
 const ORDER_PAY_FAIL = 'ORDER_PAY_FAIL';


function productListReducer(state = { products: [] }, action) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
       
      };

    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

function productSaveReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_SAVE_REQUEST:
      return {
        loading: true,
      
      };

    case PRODUCT_SAVE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_SAVE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

function productDetailsReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        product: action.payload,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

function productDeleteReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
        product: action.payload,
      };

    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        success: true,
      };
    case PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}





function cartReducer(state = { cartItems: [], shipping: {}, payment: {} }, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.product === item.product);
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };

    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

   case CART_SAVE_SHIPPING:
     return {...state, shipping: action.payload };


   case CART_SAVE_PAYMENT:
     return {...state, payment: action.payload };

     
    default:
      return state;
  }
}


function orderCreateReducer(state = {}, action) {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, order: action.payload, success: true };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}


function orderPayReducer(state = {
  order: {
    orderItems: [],
    shipping: {},
    payment: {}
  }
}, action) {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function orderDetailsReducer(state = {
  order: {
    orderItems: [],
    shipping: {},
    payment: {}
  }
}, action) {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}


const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get('/api/products');

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });

  } 
  catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};



const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });

    const { data } = await axios.delete('/api/products/' + productId, {
      headers: {
        Authorization: "Bearer" + userInfo.token,
      },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};




const saveProduct = (product) => async (dispatch, getState) => {

  try {
   
     dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });

    const {
      userSignin: { userInfo },
    } = getState();

    if (!product._id) {
      const { data } = await Axios.post('/api/products', product, {
        headers: {
          Authorization: 'Bearer'+userInfo.token,
        },
      });

      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });

    } else {
     
      const { data } = await Axios.put('/api/products/' + product._id, product, {

        headers: {
          Authorization: 'Bearer'+userInfo.token,
        },
      });

      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
  }
  
  catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};


const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get('/api/products/' + productId);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } 
  catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};



const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get('/api/products/' + productId);
    dispatch({
      type: CART_ADD_ITEM,

      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
    //ayspes cooki mej pahum enq cartitems, vor hishenq, erb poxvi
  } catch (error) {}
};




const removeFromCart = (productId) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};

const saveShipping = (data) => (dispatch) => {

dispatch({type: CART_SAVE_SHIPPING, payload: data})

// aystex async chka, qani vor sa client side operation e
}



const savePayment = (data) => (dispatch) => {

dispatch({type: CART_SAVE_PAYMENT, payload: data})

// aystex async chka, qani vor sa client side operation e
}


const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    const { userSignin: { userInfo } } = getState();
    const { data: { data: newOrder } } = await Axios.post("/api/orders", order, {
      headers: {
        Authorization: ' Bearer ' + userInfo.token
      }
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
}

const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.get("/api/orders/" + orderId, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
  }
}

const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.put("/api/orders/" + order._id + "/pay", paymentResult, {
      headers:
        { Authorization: 'Bearer' + userInfo.token }
    });
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
  }
}

export {
  productListReducer,
  productSaveReducer,
  productDetailsReducer,
  productDeleteReducer,
  cartReducer,
  listProducts,
  detailsProduct,
  addToCart,
  removeFromCart,
  saveProduct,
  deleteProduct,
  saveShipping,
  savePayment,
  orderCreateReducer,
  createOrder,
  detailsOrder,
  payOrder,
  orderPayReducer,
  orderDetailsReducer,
};
