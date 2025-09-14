import React, { createContext, useContext, useReducer, useMemo } from 'react';

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const key = action.item.variantId;
      const existing = state.items[key];
      const quantity = (existing?.quantity || 0) + action.item.quantity;
      return {
        ...state,
        items: {
          ...state.items,
          [key]: { ...action.item, quantity }
        }
      };
    }
    case 'REMOVE_ITEM': {
      const newItems = { ...state.items };
      delete newItems[action.variantId];
      return { ...state, items: newItems };
    }
    case 'UPDATE_QTY': {
      if (action.quantity <= 0) {
        const newItems = { ...state.items };
        delete newItems[action.variantId];
        return { ...state, items: newItems };
      }
      return {
        ...state,
        items: {
          ...state.items,
          [action.variantId]: { ...state.items[action.variantId], quantity: action.quantity }
        }
      };
    }
    case 'CLEAR':
      return { items: {} };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: {} });

  const summary = useMemo(() => {
    const lineItems = Object.values(state.items);
    const itemCount = lineItems.reduce((sum, li) => sum + li.quantity, 0);
    const subtotal = lineItems.reduce((sum, li) => sum + li.price * li.quantity, 0);
    return { itemCount, subtotal, lineItems };
  }, [state.items]);

  const value = useMemo(() => ({ state, dispatch, summary }), [state, summary]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
