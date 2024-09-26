import { ADD_ORDER } from "../actions";

const defaultState = {
  order: [],
  totalPrice: 0,
  totalCount: 0,
};

export const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const existingItem = state.order.find(item => item.title === action.payload.title);

      if (existingItem) {
      
        return {
          ...state,
          order: state.order.map(item =>
            item.title === action.payload.title
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
      
        return {
          ...state,
          order: [
            ...state.order,
            {
              title: action.payload.title,
              price: action.payload.price,
              quantity: 1,
            },
          ],
        };
      }

    default:
      return state;
  }
};
