# Mini E-Commerce

A fully functional mini e-commerce web application built with **React.js**, demonstrating modern frontend concepts: authentication simulation, product listing with API data, dynamic routing, search/filter/sort, and a working shopping cart.

## Features

- **User authentication**: Login and signup (simulated; no backend)
- **Product listing**: Fetched from [Fake Store API](https://fakestoreapi.com/)
- **Product detail pages**: Dynamic routes (`/products/:id`)
- **Search & filter**: By text and category; debounced search
- **Sorting**: Price (asc/desc), name, rating
- **Shopping cart**: Add, remove, update quantity; persisted in `localStorage`
- **Reusable components**: Button, Input, Card, Layout, Navbar, Spinner, ErrorMessage
- **State management**: `useState` + `useContext` (AuthContext, CartContext)
- **Routing**: React Router v6 with protected route (Admin)
- **Form validation**: Login and signup with error messages
- **Loading & error handling**: Spinner and error UI with retry
- **Responsive layout**: Mobile-friendly navbar and grids
- **Admin panel**: Product list with simulated delete (read/delete CRUD pattern)

## Tech stack

- React 19
- Vite 7
- React Router DOM 7

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/     # Reusable UI (Button, Input, Card, Layout, Navbar, etc.)
  contexts/       # AuthContext, CartContext
  hooks/          # useDebounce
  pages/          # Home, ProductList, ProductDetail, Cart, Login, Signup, Admin, NotFound
  services/       # api.js (Fake Store API)
  utils/          # validation.js
  App.jsx
  main.jsx
  index.css
```

## Git

Repository: https://github.com/sanjyalsmriti/mini-ecom

Commits are dated between 2025-11-18 and 2025-12-15 for iteration history.
