/**
 * Form validation utilities
 */

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export function validatePassword(password) {
  return password && password.length >= 6;
}

export function validateRequired(value) {
  return value != null && String(value).trim().length > 0;
}

export function getLoginErrors({ email, password }) {
  const errors = {};
  if (!validateRequired(email)) errors.email = 'Email is required';
  else if (!validateEmail(email)) errors.email = 'Invalid email format';
  if (!validateRequired(password)) errors.password = 'Password is required';
  return errors;
}

export function getSignupErrors({ name, email, password, confirmPassword }) {
  const errors = {};
  if (!validateRequired(name)) errors.name = 'Name is required';
  if (!validateRequired(email)) errors.email = 'Email is required';
  else if (!validateEmail(email)) errors.email = 'Invalid email format';
  if (!validateRequired(password)) errors.password = 'Password is required';
  else if (!validatePassword(password)) errors.password = 'Password must be at least 6 characters';
  if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
  return errors;
}
