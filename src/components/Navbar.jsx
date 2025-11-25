import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Button } from './Button';
import './Navbar.css';

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          Mini E-Com
        </Link>
        <nav className="navbar-nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Products
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/admin" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Admin
            </NavLink>
          )}
        </nav>
        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              <span className="user-email">{user?.email}</span>
              <Button variant="secondary" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login"><Button variant="outline">Login</Button></Link>
              <Link to="/signup"><Button>Sign up</Button></Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
