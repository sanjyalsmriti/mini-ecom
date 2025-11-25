import './Input.css';

export function Input({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  label,
  required,
  autoComplete,
}) {
  const id = `input-${name}`;
  return (
    <div className="input-group">
      {label && (
        <label htmlFor={id} className="input-label">
          {label} {required && '*'}
        </label>
      )}
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`input ${error ? 'input--error' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <span id={`${id}-error`} className="input-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
