import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from '../services/api';
import AddressForm from '../components/AddressForm';

export default function AddressesPage() {
  const { isLoggedIn } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getAddresses(1, 20)
      .then((d) => setAddresses(d?.addresses ?? []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [isLoggedIn]);

  const handleCreate = async (data) => {
    setSaving(true);
    try {
      await createAddress(data);
      setShowForm(false);
      load();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (data) => {
    setSaving(true);
    try {
      await updateAddress(editing._id, data);
      setEditing(null);
      load();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this address?')) return;
    try {
      await deleteAddress(id);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="page-message">
        <p>Please <Link to="/login">login</Link> to manage addresses.</p>
      </div>
    );
  }

  return (
    <div className="addresses-page">
      <h2>My Addresses</h2>

      {error && <p className="error-message">{error}</p>}

      {!showForm && !editing && (
        <button type="button" className="btn-primary" onClick={() => setShowForm(true)}>
          + Add Address
        </button>
      )}

      {showForm && (
        <AddressForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} loading={saving} />
      )}

      {editing && (
        <>
          <h3>Edit Address</h3>
          <AddressForm
            initial={editing}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(null)}
            loading={saving}
          />
        </>
      )}

      {loading ? (
        <p className="status-text">Loading…</p>
      ) : addresses.length === 0 ? (
        <p className="status-text">No saved addresses.</p>
      ) : (
        <div className="address-list">
          {addresses.map((a) => (
            <div key={a._id} className="address-card">
              <p>{a.addressLine1}</p>
              {a.addressLine2 && <p>{a.addressLine2}</p>}
              <p>{a.city}, {a.state} — {a.pincode}</p>
              <p>{a.country}</p>
              <div className="address-actions">
                <button type="button" className="btn-text" onClick={() => setEditing(a)}>
                  Edit
                </button>
                <button type="button" className="btn-danger-sm" onClick={() => handleDelete(a._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
