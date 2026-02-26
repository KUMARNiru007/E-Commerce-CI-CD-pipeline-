import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('ecom_token');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    getCurrentUser()
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem('ecom_token');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const login = async (username, password) => {
    const data = await loginUser(username, password);
    localStorage.setItem('ecom_token', data.accessToken);
    setUser(data.user);
    return data;
  };

  const register = async (email, password, username) => {
    const data = await registerUser(email, password, username);
    return data;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      /* ignore */
    }
    localStorage.removeItem('ecom_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
