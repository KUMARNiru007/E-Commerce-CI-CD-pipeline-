import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart }) {
  const thumb =
    product.thumbnail ||
    product.mainImage?.url ||
    'https://via.placeholder.com/300x200?text=No+Image';

  const discountedPrice =
    product.discountPercentage > 0
      ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
      : null;

  return (
    <article className="product-card">
      <Link to={`/product/${product._id || product.id}`}>
        <img src={thumb} alt={product.name || product.title} />
      </Link>

      <div className="product-meta">
        <h2>{product.name || product.title}</h2>
        <p className="brand">{product.brand ?? product.category}</p>

        <div className="price-row">
          <span className="price">${product.price}</span>
          {discountedPrice && (
            <span className="price-discounted">${discountedPrice}</span>
          )}
        </div>

        {product.rating !== undefined && (
          <p className="rating">
            {'★'.repeat(Math.round(product.rating))}
            {'☆'.repeat(5 - Math.round(product.rating))}
            <span> {product.rating}</span>
          </p>
        )}
      </div>

      {onAddToCart && (
        <button type="button" onClick={() => onAddToCart(product._id || product.id)}>
          Add to Cart
        </button>
      )}
    </article>
  );
}
