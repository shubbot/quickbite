import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]); // [{ _id, name, price, quantity }]

  const addItem = (item) => {
    setItems((current) => {
      const existing = current.find((it) => it._id === item._id);
      if (existing) {
        return current.map((it) =>
          it._id === item._id
            ? { ...it, quantity: it.quantity + 1 }
            : it
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setItems((current) => {
      const existing = current.find((it) => it._id === id);
      if (!existing) return current;
      if (existing.quantity <= 1) {
        return current.filter((it) => it._id !== id);
      }
      return current.map((it) =>
        it._id === id ? { ...it, quantity: it.quantity - 1 } : it
      );
    });
  };

  const clearCart = () => setItems([]);

  const total = useMemo(
    () =>
      items.reduce(
        (sum, it) => sum + it.price * it.quantity,
        0
      ),
    [items]
  );

  const value = {
    items,
    addItem,
    removeItem,
    clearCart,
    total,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);