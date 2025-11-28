import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import './NotFound.css';

export function NotFound() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/"><Button>Go home</Button></Link>
    </div>
  );
}
