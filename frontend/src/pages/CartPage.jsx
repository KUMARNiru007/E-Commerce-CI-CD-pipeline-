import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { isLoggedIn } = useAuth();
  const { cart, loading, remove, clear, refresh } = useCart();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className="page-message">
        <h2>Your Cart</h2>
        <p>Please <Link to="/login">login</Link> to view your cart.</p>
      </div>
    );
  }

  if (loading) return <p className="status-text">Loading cart…</p>;

  const items = cart?.items ?? [];
  const couponDiscount = cart?.couponDiscount ?? 0;
  const cartTotal = cart?.cartTotal ?? 0;
  const discountedTotal = cart?.discountedTotal ?? cartTotal;

  const handleRemove = async (productId) => {
    try {
      await remove(productId);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleClear = async () => {
    if (!confirm('Clear entire cart?')) return;
    try {
      await clear();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart ({items.length} items)</h2>

      {items.length === 0 ? (
        <p className="status-text">
          Cart is empty. <Link to="/">Browse products</Link>
        </p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const p = item.product;
                const thumb = p?.mainImage?.url || p?.thumbnail || '';
                return (
                  <tr key={item._id}>
                    <td><img src={thumb} alt="" className="cart-thumb" /></td>
                    <td>
                      <Link to={`/product/${p?._id || p?.id}`}>{p?.name || p?.title}</Link>
                    </td>
                    <td>${p?.price}</td>
                    <td>{item.quantity}</td>
                    <td>${(p?.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        type="button"
                        className="btn-danger-sm"
                        onClick={() => handleRemove(p?._id || p?.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="cart-summary">
            <p>Subtotal: <strong>${cartTotal}</strong></p>
            {couponDiscount > 0 && <p>Coupon discount: -${couponDiscount}</p>}
            <p className="total">Total: <strong>${discountedTotal}</strong></p>

            <div className="cart-actions">
              <button type="button" className="btn-primary" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </button>
              <button type="button" className="btn-secondary" onClick={handleClear}>
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
