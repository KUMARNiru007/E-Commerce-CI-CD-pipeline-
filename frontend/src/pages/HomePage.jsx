import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getRandomProducts, getProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

export default function HomePage() {
  const { isLoggedIn } = useAuth();
  const { add } = useCart();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [search, setSearch] = useState('');

  /* Fetch categories once (authenticated endpoint) */
  useEffect(() => {
    if (!isLoggedIn) return;
    getCategories(1, 30)
      .then((data) => setCategories(data?.categories ?? []))
      .catch(() => {});
  }, [isLoggedIn]);

  /* Fetch products list */
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        let data;
        if (isLoggedIn) {
          data = await getProducts(page, 12);
          setProducts(data?.products ?? []);
          setTotalPages(data?.totalPages ?? 1);
        } else {
          data = await getRandomProducts(page, 12);
          setProducts(data?.data ?? []);
          setTotalPages(data?.totalPages ?? 1);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page, isLoggedIn, selectedCat]);

  const handleAddToCart = async (productId) => {
    if (!isLoggedIn) {
      alert('Please login to add items to your cart');
      return;
    }
    try {
      await add(productId, 1);
      alert('Added to cart!');
    } catch (err) {
      alert(err.message);
    }
  };

  const displayed = products.filter((p) => {
    const name = (p.name || p.title || '').toLowerCase();
    const matchSearch = !search || name.includes(search.toLowerCase());
    const cat = p.category?._id || p.category;
    const matchCat = !selectedCat || cat === selectedCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="home-page">
      <div className="home-toolbar">
        <input
          className="search-input"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {categories.length > 0 && (
        <div className="category-row">
          <span
            className={`category-pill ${!selectedCat ? 'active' : ''}`}
            onClick={() => setSelectedCat(null)}
          >
            All
          </span>
          {categories.map((c) => (
            <span
              key={c._id}
              className={`category-pill ${selectedCat === c._id ? 'active' : ''}`}
              onClick={() => setSelectedCat(c._id)}
            >
              {c.name}
            </span>
          ))}
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p className="status-text">Loading products…</p>
      ) : displayed.length === 0 ? (
        <p className="status-text">No products found.</p>
      ) : (
        <section className="product-grid">
          {displayed.map((p) => (
            <ProductCard
              key={p._id || p.id}
              product={p}
              onAddToCart={handleAddToCart}
            />
          ))}
        </section>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} disabled={loading} />
    </div>
  );
}
