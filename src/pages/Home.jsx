import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import './Home.css';

export function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Mini E-Commerce</h1>
        <p>Browse products, add to cart, and checkout. Built with React.</p>
        <Link to="/products">
          <Button>Browse products</Button>
        </Link>
      </section>
      <section className="features">
        <div className="feature">
          <h3>Products</h3>
          <p>Dynamic product listing with search, filter, and sort.</p>
          <Link to="/products">View all</Link>
        </div>
        <div className="feature">
          <h3>Cart</h3>
          <p>Add, remove, and update quantities in your cart.</p>
          <Link to="/cart">Go to cart</Link>
        </div>
        <div className="feature">
          <h3>Account</h3>
          <p>Sign up or log in to access the admin panel.</p>
          <Link to="/login">Login</Link>
        </div>
      </section>
    </div>
  );
}
