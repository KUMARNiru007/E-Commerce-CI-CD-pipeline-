import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">ShopFree</Link>

      <div className="nav-links">
        <Link to="/">Products</Link>

        {isLoggedIn ? (
          <>
            <Link to="/cart" className="cart-link">
              Cart{itemCount > 0 && <span className="badge">{itemCount}</span>}
            </Link>
            <Link to="/orders">Orders</Link>
            <Link to="/addresses">Addresses</Link>
            <Link to="/profile">Profile</Link>
            <button type="button" className="btn-text" onClick={handleLogout}>
              Logout
            </button>
            <span className="nav-user">{user?.username}</span>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
