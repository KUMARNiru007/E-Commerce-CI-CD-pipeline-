import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyOrders, getOrderById } from '../services/api';
import Pagination from '../components/Pagination';

export default function OrdersPage() {
  const { isLoggedIn } = useAuth();
  const { orderId } = useParams();

  /* ── single order detail ── */
  const [order, setOrder] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');

  useEffect(() => {
    if (!orderId || !isLoggedIn) return;
    setDetailLoading(true);
    getOrderById(orderId)
      .then((d) => setOrder(d))
      .catch((e) => setDetailError(e.message))
      .finally(() => setDetailLoading(false));
  }, [orderId, isLoggedIn]);

  /* ── order list ── */
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (orderId || !isLoggedIn) return;
    setLoading(true);
    getMyOrders(page, 10)
      .then((d) => {
        setOrders(d?.orders ?? []);
        setTotalPages(d?.totalPages ?? 1);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [page, isLoggedIn, orderId]);

  if (!isLoggedIn) {
    return (
      <div className="page-message">
        <p>Please <Link to="/login">login</Link> to view your orders.</p>
      </div>
    );
  }

  /* ── single order view ── */
  if (orderId) {
    if (detailLoading) return <p className="status-text">Loading order…</p>;
    if (detailError) return <p className="error-message">{detailError}</p>;
    if (!order) return <p className="status-text">Order not found.</p>;

    return (
      <div className="order-detail">
        <Link to="/orders">&larr; All Orders</Link>
        <h2>Order #{order._id?.slice(-6)}</h2>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total:</strong> ${order.orderPrice}</p>
        <p><strong>Payment:</strong> {order.paymentProvider} — {order.isPaymentDone ? 'Paid' : 'Pending'}</p>

        <h3>Items</h3>
        <ul className="order-items">
          {order.items?.map((item, idx) => (
            <li key={idx}>
              {item.product?.name || 'Product'} × {item.quantity} — ${item.product?.price * item.quantity}
            </li>
          ))}
        </ul>

        {order.address && (
          <>
            <h3>Shipping Address</h3>
            <p>
              {order.address.addressLine1}, {order.address.city}, {order.address.state} — {order.address.pincode}
            </p>
          </>
        )}
      </div>
    );
  }

  /* ── order list view ── */
  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p className="status-text">Loading orders…</p>
      ) : orders.length === 0 ? (
        <p className="status-text">No orders yet. <Link to="/">Start shopping!</Link></p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Status</th>
              <th>Total</th>
              <th>Payment</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>#{o._id?.slice(-6)}</td>
                <td>{o.status}</td>
                <td>${o.orderPrice}</td>
                <td>{o.isPaymentDone ? 'Paid' : 'Pending'}</td>
                <td><Link to={`/orders/${o._id}`}>View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} disabled={loading} />
    </div>
  );
}
