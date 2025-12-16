import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/Button';
import { formatPrice } from '../utils/formatPrice';
import './Cart.css';

export function Cart() {
  const { items, cartTotal, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Add some products from the shop.</p>
        <Link to="/products"><Button>Browse products</Button></Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping cart</h1>
      <div className="cart-items">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="cart-item">
            <div className="cart-item-image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="cart-item-details">
              <Link to={`/products/${product.id}`} className="cart-item-title">
                {product.title}
              </Link>
              <p className="cart-item-price">{formatPrice(product.price)}</p>
              <div className="cart-item-actions">
                <div className="qty-controls">
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <Button variant="danger" onClick={() => removeFromCart(product.id)}>
                  Remove
                </Button>
              </div>
            </div>
            <div className="cart-item-subtotal">
              {formatPrice(product.price * quantity)}
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p className="cart-total">
          Total: <strong>{formatPrice(cartTotal)}</strong>
        </p>
        <p className="cart-note">Checkout is simulated. No payment is processed.</p>
      </div>
    </div>
  );
}
