import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getProductById, getRandomProductById } from '../services/api';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { add } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        let data;
        if (isLoggedIn) {
          data = await getProductById(id);
        } else {
          data = await getRandomProductById(id);
        }
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isLoggedIn]);

  const handleAdd = async () => {
    if (!isLoggedIn) {
      alert('Please login to add items to cart');
      return;
    }
    try {
      await add(product._id || product.id, qty);
      alert('Added to cart!');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="status-text">Loading product…</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!product) return <p className="status-text">Product not found.</p>;

  const images =
    product.subImages?.map((i) => i.url) ||
    product.images ||
    [product.mainImage?.url || product.thumbnail];

  return (
    <div className="detail-page">
      <button type="button" className="btn-text" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <div className="detail-grid">
        <div className="detail-images">
          <img className="detail-main-img" src={images[activeImg]} alt={product.name || product.title} />
          {images.length > 1 && (
            <div className="detail-thumbs">
              {images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className={i === activeImg ? 'thumb active' : 'thumb'}
                  onClick={() => setActiveImg(i)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="detail-info">
          <h1>{product.name || product.title}</h1>
          <p className="brand">{product.brand ?? product.category}</p>
          <p className="detail-price">${product.price}</p>

          {product.discountPercentage > 0 && (
            <p className="discount">-{product.discountPercentage}% off</p>
          )}

          <p className="detail-desc">{product.description}</p>

          {product.stock !== undefined && (
            <p className="stock">
              {product.stock > 0 ? `In stock (${product.stock})` : 'Out of stock'}
            </p>
          )}

          {product.rating !== undefined && (
            <p className="rating">
              {'★'.repeat(Math.round(product.rating))}
              {'☆'.repeat(5 - Math.round(product.rating))} {product.rating}
            </p>
          )}

          <div className="qty-row">
            <label htmlFor="qty">Qty:</label>
            <input
              id="qty"
              type="number"
              min={1}
              max={product.stock || 99}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div>

          <button type="button" className="btn-primary" onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
