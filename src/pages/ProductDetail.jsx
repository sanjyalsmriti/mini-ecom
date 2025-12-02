import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/Button';
import { Spinner } from '../components/Spinner';
import { ErrorMessage } from '../components/ErrorMessage';
import './ProductDetail.css';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchProductById(id)
      .then((data) => {
        if (!cancelled) setProduct(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  if (!product) return null;

  return (
    <div className="product-detail">
      <button type="button" className="back-link" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="product-detail-grid">
        <div className="product-detail-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-detail-info">
          <h1>{product.title}</h1>
          <p className="product-detail-category">{product.category}</p>
          <p className="product-detail-price">${product.price?.toFixed(2)}</p>
          {product.rating && (
            <p className="product-detail-rating">
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </p>
          )}
          <p className="product-detail-desc">{product.description}</p>
          <div className="product-detail-actions">
            <label>
              Quantity:
              <input
                type="number"
                min={1}
                max={99}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="qty-input"
              />
            </label>
            <Button onClick={handleAddToCart}>Add to cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
