import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  function updateQuantity(id, quantity) {
    if (quantity <= 0) return removeFromCart(id);
    setCart(prev =>
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  }

  function clearCart() {
    setCart([]);
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = { cart, addToCart, removeFromCart, updateQuantity, clearCart, total };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}