import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const CartContext = createContext(null);

function loadCart() {
  try {
    const stored = localStorage.getItem('mini-ecom-cart');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem('mini-ecom-cart', JSON.stringify(items));
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  const persist = useCallback((nextItems) => {
    setItems(nextItems);
    saveCart(nextItems);
  }, []);

  const addToCart = useCallback((product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      let next;
      if (existing) {
        next = prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        next = [...prev, { product, quantity }];
      }
      saveCart(next);
      return next;
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.product.id !== productId);
      saveCart(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) => {
      const next = prev.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      );
      saveCart(next);
      return next;
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
    saveCart([]);
  }, []);

  const cartCount = useMemo(() => items.reduce((acc, i) => acc + i.quantity, 0), [items]);
  const cartTotal = useMemo(
    () => items.reduce((acc, i) => acc + i.product.price * i.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [items, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
