import './ErrorMessage.css';

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message" role="alert">
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="error-retry" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
