# QuickBite – Online Food Ordering Platform

QuickBite is a full-stack food ordering web app that lets users browse menus, add items to a cart, place orders, and track them. It includes secure authentication, role-based admin features, and a polished, responsive UI.

## Features

- User authentication with JWT (register / login / logout)
- Role-based access:
  - **User**: browse menu, manage cart, checkout, view order history
  - **Admin**: manage menu items (create, edit, delete) and seed sample data
- Menu browsing with categories, images, and responsive cards
- Cart management:
  - Increment/decrement quantities
  - Order summary with totals
- Checkout flow:
  - Fake payment step (Stripe-ready backend)
  - Orders stored in MongoDB
- Order history with status and line items
- Modern UI with React + TailwindCSS

## Tech Stack

- **Frontend:** React (Vite), React Router, Axios, TailwindCSS
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
- **Payments:** Stripe (server-side payment intent integration, ready for frontend hookup)

## API Overview

- `POST /api/auth/register` – register user (role: user/admin)
- `POST /api/auth/login` – login, returns JWT
- `GET /api/auth/me` – get current user
- `GET /api/menu` – list menu items
- `POST /api/menu` – create menu item (admin)
- `PUT /api/menu/:id` – update menu item (admin)
- `DELETE /api/menu/:id` – delete menu item (admin)
- `POST /api/orders` – create order
- `GET /api/orders/my` – current user’s orders
- `POST /api/payments/create-intent` – create Stripe payment intent (test mode)

## How to Run

### Backend

```bash
cd quickbite-backend
npm install
npm run dev