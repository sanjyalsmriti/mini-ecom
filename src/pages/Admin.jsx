import { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import { Spinner } from '../components/Spinner';
import { ErrorMessage } from '../components/ErrorMessage';
import './Admin.css';

/**
 * Simple admin panel: list products (read). Add/Edit/Delete are simulated in local state
 * to demonstrate CRUD patterns without a real backend.
 */
export function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Remove this product from the list? (Simulated - no API call)')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="admin-page">
      <h1>Admin – Product list (read/delete simulation)</h1>
      <p className="admin-desc">
        Products are loaded from the API. Delete is simulated locally. Add/Edit would follow the same pattern with a form and API.
      </p>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  <img src={p.image} alt="" className="admin-thumb" />
                </td>
                <td>{p.title}</td>
                <td>{p.category}</td>
                <td>${p.price?.toFixed(2)}</td>
                <td>
                  <button
                    type="button"
                    className="admin-btn-delete"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete (simulated)
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
