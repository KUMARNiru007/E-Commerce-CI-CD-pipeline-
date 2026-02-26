import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { addToCart, clearCart, getCart, removeFromCart } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const { isLoggedIn } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!isLoggedIn) {
      setCart(null);
      return;
    }
    setLoading(true);
    try {
      const data = await getCart();
      setCart(data);
    } catch {
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const add = async (productId, quantity = 1) => {
    await addToCart(productId, quantity);
    await fetchCart();
  };

  const remove = async (productId) => {
    await removeFromCart(productId);
    await fetchCart();
  };

  const clear = async () => {
    await clearCart();
    await fetchCart();
  };

  const itemCount = cart?.items?.length ?? 0;

  return (
    <CartContext.Provider value={{ cart, loading, itemCount, add, remove, clear, refresh: fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}
