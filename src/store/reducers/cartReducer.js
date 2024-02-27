import {
  INCREASE,
  DECREASE,
  CLEAR_CART,
  REMOVE,
  GET_TOTALS,
} from '../actions/cartActions';
import cartItems from '../../cart-items';

// store - stores data, think of state
// reducer - function that used to update store
// two arguments - state, action
// state - old state/state before update
// action - what happened / what update
// return updated state or old state

// DON'T MUTATE THE REDUX STATE - REDUX BUILD ON IMMUTABILITY(COPY)
//  for example:
// mutate is like this => state.count = state.count - 1;
// copy is like this => return { count: state.count - 1 };

const initialStore = {
  cart: cartItems,
  total: 0,
  amount: 0,
};

const cartReducer = (state = initialStore, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  if (action.type === DECREASE) {
    let tempCartArray = [];

    if (action.payload.amount === 1) {
      tempCartArray = state.cart.filter(
        (itemFilter) => itemFilter.id !== action.payload.id
      );
    } else {
      tempCartArray = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item = { ...item, amount: item.amount - 1 };
        }
        return item;
      });
    }

    return { ...state, cart: tempCartArray };
  }

  if (action.type === INCREASE) {
    const newCartValueArray = state.cart.map((item) => {
      // console.log(item);
      if (item.id === action.payload.id) {
        item = { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    return { ...state, cart: newCartValueArray };
  }

  if (action.type === REMOVE) {
    const newCartArray = state.cart.filter(
      (item) => item.id !== action.payload.id
    );
    return { ...state, cart: newCartArray };
  }

  if (action.type === GET_TOTALS) {
    let { total, amount } = state.cart.reduce(
      (cartTotal, currItem) => {
        const { price, amount } = currItem;
        const itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total: total, amount: amount };
  }
  return state;
};

export default cartReducer;
