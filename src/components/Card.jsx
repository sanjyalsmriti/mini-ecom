import './Card.css';

export function Card({ children, className = '' }) {
  return <div className={`card ${className}`.trim()}>{children}</div>;
}

export function CardImage({ src, alt }) {
  return (
    <div className="card-image">
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}

export function CardBody({ children }) {
  return <div className="card-body">{children}</div>;
}

export function CardTitle({ children }) {
  return <h3 className="card-title">{children}</h3>;
}
