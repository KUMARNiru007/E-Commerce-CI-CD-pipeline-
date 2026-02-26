import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getAddresses, createRazorpayOrder, verifyRazorpayPayment } from '../services/api';

export default function CheckoutPage() {
  const { isLoggedIn } = useAuth();
  const { cart, refresh } = useCart();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddr, setSelectedAddr] = useState('');
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }
    getAddresses(1, 20)
      .then((d) => {
        const list = d?.addresses ?? [];
        setAddresses(list);
        if (list.length > 0) setSelectedAddr(list[0]._id);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  const handleCheckout = async () => {
    if (!selectedAddr) {
      alert('Please select a delivery address');
      return;
    }
    setPlacing(true);
    setError('');
    try {
      const orderData = await createRazorpayOrder(selectedAddr);
      alert(
        `Order placed successfully!\nOrder ID: ${orderData?._id ?? 'N/A'}\nNote: Razorpay payment integration requires a client-side SDK for production.`,
      );
      await refresh();
      navigate('/orders');
    } catch (err) {
      setError(err.message);
    } finally {
      setPlacing(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="page-message">
        <p>Please <Link to="/login">login</Link> to checkout.</p>
      </div>
    );
  }

  const items = cart?.items ?? [];
  const total = cart?.discountedTotal ?? cart?.cartTotal ?? 0;

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      {error && <p className="error-message">{error}</p>}

      {items.length === 0 ? (
        <p className="status-text">Your cart is empty. <Link to="/">Shop now</Link></p>
      ) : (
        <>
          <section className="checkout-summary">
            <h3>Order Summary</h3>
            <ul>
              {items.map((item) => (
                <li key={item._id}>
                  {item.product?.name || item.product?.title} × {item.quantity} — $
                  {(item.product?.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="total">Total: <strong>${total}</strong></p>
          </section>

          <section className="checkout-address">
            <h3>Delivery Address</h3>

            {loading ? (
              <p className="status-text">Loading addresses…</p>
            ) : addresses.length === 0 ? (
              <p className="status-text">
                No addresses. <Link to="/addresses">Add one first</Link>.
              </p>
            ) : (
              <div className="address-select">
                {addresses.map((a) => (
                  <label key={a._id} className={`address-option ${selectedAddr === a._id ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="address"
                      value={a._id}
                      checked={selectedAddr === a._id}
                      onChange={() => setSelectedAddr(a._id)}
                    />
                    <span>
                      {a.addressLine1}, {a.city}, {a.state} — {a.pincode}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </section>

          <button
            type="button"
            className="btn-primary"
            disabled={placing || !selectedAddr}
            onClick={handleCheckout}
          >
            {placing ? 'Placing Order…' : 'Place Order (Razorpay)'}
          </button>
        </>
      )}
    </div>
  );
}
