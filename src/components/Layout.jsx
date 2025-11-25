import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import './Layout.css';

export function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout-main">
        <Outlet />
      </main>
      <footer className="layout-footer">
        <p>Mini E-Commerce &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
