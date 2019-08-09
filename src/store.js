import { createStore } from "redux";
import initialCatalogues from "./data.js";

const initialState = {
  query: "",
  loggedIn: false,
  username: "",
  catalogues: initialCatalogues,
  cart: [],
  product: ""
};

function reducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.query };
    case "LOGIN_SUCCESS":
      return { ...state, loggedIn: true, username: action.username };
    case "LOGOUT":
      return { ...state, loggedIn: false, username: "" };
    case "ADD_TO_CART":
      return {
        ...state,
        product: action.product,
        cart: action.cart
      };
    case "REMOVE_FROM_CART":
      return { ...state, cart: action.cart, product: action.product };
    case "COMPLETE_CHECKOUT":
      console.log("check:", state, { ...state, cart: [] });
      return { ...state, cart: [] };
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
