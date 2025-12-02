import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { useDebounce } from '../hooks/useDebounce';
import { Card, CardImage, CardBody, CardTitle } from '../components/Card';
import { Button } from '../components/Button';
import { Spinner } from '../components/Spinner';
import { ErrorMessage } from '../components/ErrorMessage';
import './ProductList.css';

const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'title', label: 'Name A–Z' },
  { value: 'rating', label: 'Rating' },
];

export function ProductList() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([prods, cats]) => {
        if (!cancelled) {
          setProducts(prods);
          setCategories(cats);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const filteredAndSorted = useMemo(() => {
    let list = [...products];
    if (category) list = list.filter((p) => p.category === category);
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }
    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'title') list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    else if (sort === 'rating') list.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));
    return list;
  }, [products, category, debouncedSearch, sort]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="product-list-page">
      <h1>Products</h1>
      <div className="filters-bar">
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
          aria-label="Search products"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="filter-select"
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="filter-select"
          aria-label="Sort by"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <p className="results-count">{filteredAndSorted.length} product(s)</p>
      <div className="product-grid">
        {filteredAndSorted.map((product) => (
          <article key={product.id} className="product-card-wrap">
            <Card>
              <Link to={`/products/${product.id}`} className="product-link">
                <CardImage src={product.image} alt={product.title} />
                <CardBody>
                  <CardTitle>{product.title}</CardTitle>
                  <p className="product-price">${product.price?.toFixed(2)}</p>
                </CardBody>
              </Link>
              <div className="product-actions">
                <Link to={`/products/${product.id}`} className="product-cta">View details</Link>
                <Button variant="secondary" onClick={() => addToCart(product, 1)}>Add to cart</Button>
              </div>
            </Card>
          </article>
        ))}
      </div>
      {filteredAndSorted.length === 0 && (
        <p className="no-results">No products match your filters.</p>
      )}
    </div>
  );
}
