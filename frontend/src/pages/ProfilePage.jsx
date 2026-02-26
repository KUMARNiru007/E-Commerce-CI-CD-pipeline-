import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProfile } from '../services/api';

export default function ProfilePage() {
  const { isLoggedIn, user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }
    getProfile()
      .then((data) => setProfile(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="page-message">
        <p>Please <Link to="/login">login</Link> to view your profile.</p>
      </div>
    );
  }

  if (loading) return <p className="status-text">Loading profile…</p>;
  if (error) return <p className="error-message">{error}</p>;

  const data = profile || user;

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      {data?.avatar?.url && (
        <img src={data.avatar.url} className="profile-avatar" alt="avatar" />
      )}

      <div className="profile-info">
        <p><strong>Username:</strong> {data?.username}</p>
        <p><strong>Email:</strong> {data?.email}</p>
        <p><strong>Role:</strong> {data?.role}</p>
      </div>

      <div className="profile-links">
        <Link to="/orders" className="btn-primary">My Orders</Link>
        <Link to="/addresses" className="btn-secondary">My Addresses</Link>
      </div>
    </div>
  );
}
