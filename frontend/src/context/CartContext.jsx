import { createContext, useContext, useReducer, useEffect } from 'react';
import { createCheckout } from '../lib/shopifyClient';

/**
 * Cart Context
 * 
 * Provides global cart state and actions for the entire app.
 * Cart persists to localStorage for session continuity.
 */

// Initial cart state
const initialState = {
  items: [],
  isOpen: false,
  isLoading: false,
  checkoutUrl: null,
};

// Cart actions
const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  TOGGLE_CART: 'TOGGLE_CART',
  SET_LOADING: 'SET_LOADING',
  SET_CHECKOUT_URL: 'SET_CHECKOUT_URL',
};

// Cart reducer
function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const existingIndex = state.items.findIndex(
        item => item.variantId === action.payload.variantId
      );

      if (existingIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1,
        };
        return { ...state, items: updatedItems };
      }

      // New item
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.variantId !== action.payload),
      };

    case ACTIONS.UPDATE_QUANTITY: {
      const { variantId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.variantId !== variantId),
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.variantId === variantId ? { ...item, quantity } : item
        ),
      };
    }

    case ACTIONS.CLEAR_CART:
      return { ...state, items: [], checkoutUrl: null };

    case ACTIONS.TOGGLE_CART:
      return { ...state, isOpen: action.payload ?? !state.isOpen };

    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };

    case ACTIONS.SET_CHECKOUT_URL:
      return { ...state, checkoutUrl: action.payload };

    default:
      return state;
  }
}

// Create context
const CartContext = createContext(null);

// Local storage key
const CART_STORAGE_KEY = 'shopify-cart';

/**
 * CartProvider Component
 * 
 * Wraps the app to provide cart state and actions.
 */
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    // Load cart from localStorage on init
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return { ...initial, items: parsed.items || [] };
        } catch (e) {
          console.error('Failed to parse cart from localStorage:', e);
        }
      }
    }
    return initial;
  });

  // Save cart to localStorage when items change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items: state.items }));
  }, [state.items]);

  // Cart actions
  const addItem = (product) => {
    dispatch({
      type: ACTIONS.ADD_ITEM,
      payload: {
        id: product.id,
        variantId: product.variantId,
        title: product.title,
        price: product.price,
        currencyCode: product.currencyCode || 'USD',
        image: product.image,
        handle: product.handle,
      },
    });
    // Open cart drawer when item is added
    dispatch({ type: ACTIONS.TOGGLE_CART, payload: true });
  };

  const removeItem = (variantId) => {
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: variantId });
  };

  const updateQuantity = (variantId, quantity) => {
    dispatch({ type: ACTIONS.UPDATE_QUANTITY, payload: { variantId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  };

  const toggleCart = (isOpen) => {
    dispatch({ type: ACTIONS.TOGGLE_CART, payload: isOpen });
  };

  const checkout = async () => {
    if (state.items.length === 0) return;

    dispatch({ type: ACTIONS.SET_LOADING, payload: true });

    try {
      const lineItems = state.items.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity,
      }));

      const checkoutData = await createCheckout(lineItems);

      if (checkoutData?.webUrl) {
        dispatch({ type: ACTIONS.SET_CHECKOUT_URL, payload: checkoutData.webUrl });
        // Redirect to Shopify checkout
        window.location.href = checkoutData.webUrl;
      } else {
        console.error('No checkout URL received');
        alert('Unable to create checkout. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Calculate totals
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value = {
    ...state,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * useCart Hook
 * 
 * Access cart state and actions from any component.
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
