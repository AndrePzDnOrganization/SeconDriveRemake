import { createStore } from 'zustand';

type Cart = {
  items: Product[];
};

type CartStore = {
  items: Cart['items'];
  addItem: (item: Product) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  updateQuantity: (id: number, quantity: number) => void;
};

const INITIAL_VALUE: Cart = {
  items: [],
};

const getCartData = localStorage.getItem('cart');

const initialState = {
  items: getCartData
    ? (JSON.parse(getCartData) as Cart['items'])
    : INITIAL_VALUE.items,
};

const cartStore = createStore<CartStore>(set => ({
  items: initialState.items,
  addItem: item =>
    set(state => {
      const newItems = [...state.items, item];
      localStorage.setItem('cart', JSON.stringify(newItems));
      return {
        ...state,
        items: newItems,
      };
    }),
  removeItem: id =>
    set(state => {
      const newItems = state.items.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(newItems));
      return {
        ...state,
        items: newItems,
      };
    }),
  clearCart: () => {
    localStorage.removeItem('cart');
    set(state => ({
      ...state,
      items: [],
    }));
  },
  updateQuantity: (id, quantity) => {
    set(state => {
      const newItems = state.items.map(item => {
        if (item.id === id) {
          return {
            ...item,
            quantity,
          };
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(newItems));
      return {
        ...state,
        items: newItems,
      };
    });
  },
}));

export default cartStore;
