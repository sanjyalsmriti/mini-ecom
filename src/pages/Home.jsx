import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../services/api';
import { Button } from '../components/Button';
import { Spinner } from '../components/Spinner';
import { ErrorMessage } from '../components/ErrorMessage';
import './Home.css';

function formatCategoryLabel(str) {
  if (!str) return '';
  return str
    .replace(/'s /g, "'s ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function Home() {
  const [categoriesWithImages, setCategoriesWithImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([products, categoryNames]) => {
        if (cancelled) return;
        const byCategory = {};
        products.forEach((p) => {
          if (!byCategory[p.category]) {
            byCategory[p.category] = { name: p.category, image: p.image };
          }
        });
        const list = categoryNames.map((name) => ({
          id: name,
          name: formatCategoryLabel(name),
          slug: name,
          image: byCategory[name]?.image || '',
        }));
        setCategoriesWithImages(list);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="home home--loading">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="home">
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-hero__inner">
          <h1 className="home-hero__title">
            Shop the best deals in Nepal
          </h1>
          <p className="home-hero__subtitle">
            Discover electronics, fashion, jewellery and more. Fast delivery, easy returns.
          </p>
          <Link to="/products" className="home-hero__cta">
            <Button className="home-hero__btn">Shop all products</Button>
          </Link>
        </div>
      </section>

      <section className="home-section home-categories">
        <h2 className="home-section__title">Shop by category</h2>
        <div className="home-categories__grid">
          {categoriesWithImages.map((cat) => (
            <Link
              key={cat.id}
              to="/products"
              state={{ category: cat.slug }}
              className="home-category-card"
            >
              <div className="home-category-card__image">
                <img src={cat.image} alt={cat.name} />
              </div>
              <span className="home-category-card__label">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section home-usp">
        <div className="home-usp__grid">
          <div className="home-usp__item">
            <span className="home-usp__icon">🚚</span>
            <h3>Free delivery</h3>
            <p>On orders across Nepal</p>
          </div>
          <div className="home-usp__item">
            <span className="home-usp__icon">↩️</span>
            <h3>Easy returns</h3>
            <p>7-day return policy</p>
          </div>
          <div className="home-usp__item">
            <span className="home-usp__icon">🔒</span>
            <h3>Secure payment</h3>
            <p>NPR checkout</p>
          </div>
        </div>
      </section>
    </div>
  );
}
