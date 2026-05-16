<h1 align="center">
    SHOPCART: Ecommerce Site
</h1>

<h3 align="center">
Seamless shopping, search and explore different product categories, add products to cart, and checkout swiftly. <br>
Become a seller and add products, monitor sales, and gather customer feedback.
</h3>

<br>

[Youtube Video](https://youtu.be/i_z0HYk3IuQ?si=S04-IBq7Ny8k0FYC)
<br><br>
[LinkedIn](https://www.linkedin.com/in/yogndr/)

# About

ShopCart is an ecommerce site developed using the MERN (MongoDB, Express.js, React, Node.js) stack. It offers a user-friendly and efficient shopping experience for customers, while providing sellers with essential tools to manage their products and sales.

## Features

- **User Registration:** ShopCart allows users to register as customers or sellers, enabling a tailored shopping experience.

- **Cart System:** Customers can add products to their cart for easy checkout. The cart allows them to review and manage their selections before completing the purchase.

- **Product Search:** ShopCart offers a search functionality where customers can find products by name or browse through categories such as Electronics, Clothes, Kitchen, and more.

- **Reviews and Ratings:** Customers can leave reviews and ratings (out of 5) for products they've purchased, providing valuable feedback for sellers and building trust within the community.

- **Seller Dashboard:** Sellers have access to a dedicated dashboard where they can manage their products, view sales data, and gain insights into their store's performance through data visualization.

- **Product Management:** Sellers can add products with detailed information and set their prices. They can also check which customers have added their products to their carts.

- **Order Tracking:** Sellers can monitor the products ordered by customers, helping them stay organized and fulfill orders efficiently.

## Technologies Used

- Frontend: React.js, Material UI, Redux Toolkit, Styled Components
- Backend: Node.js, Express.js, JWT Token
- Database: MongoDB
- Data Visualization: React Apexcharts

<br>

# Installation

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (used only for MongoDB)

## 1. Clone the repository

```sh
git clone https://github.com/tiennm2911/MERN-Ecommerce-Site.git
cd MERN-Ecommerce-Site
```

## 2. Start MongoDB with Docker

MongoDB runs inside a Docker container; the backend and frontend run on your host with `npm`.

```sh
docker compose up -d
```

This starts a MongoDB 7 container (`shopcart-mongo`) listening on `localhost:27017` with a persistent volume `mongo-data`.

Useful commands:

```sh
docker compose ps         # check container status
docker compose logs -f    # follow logs
docker compose down       # stop (data is preserved in the volume)
```

## 3. Set up the backend

Open a terminal and run:

```sh
cd backend
npm install
```

Create a `.env` file inside the `backend` folder with the following contents:

```env
MONGO_URL=mongodb://127.0.0.1:27017/ecommerce
SECRET_KEY=secret-key
PORT=5000
```

### Seed demo data

Populate the database with a demo seller and sample products:

```sh
npm run seed
```

This creates:

- **Demo seller** — email `demo@shop.com`, password `demo123`
- A set of sample products listed under the demo seller's shop

### Start the backend

```sh
npm start
```

The API will be available at `http://localhost:5000`.

## 4. Set up the frontend

Open a second terminal and run:

```sh
cd frontend
npm install
```

Create a `.env` file inside the `frontend` folder with:

```env
REACT_APP_BASE_URL=http://localhost:5000
```

Start the frontend:

```sh
npm start
```

The app will open at `http://localhost:3000`.
<br>
# Error Solution

If you encounter a network error while signing up, follow these steps to resolve it:

1. Navigate to the `src > redux > userHandle.js` file.

2. Add the following line after the import statements:

```javascript
const REACT_APP_BASE_URL = "http://localhost:5000";
```

3. Replace all instances of `process.env.REACT_APP_BASE_URL` with `REACT_APP_BASE_URL`.

The issue arises because the `.env` file in the frontend may not work for all users, while it works for me.

These steps should resolve the network error in the frontend. If the issue persists, feel free to contact me for further assistance.

Don't forget to leave a star for this project if you found the solution helpful. Thank you!

# Deployment
* Render - server side
* Vercel - client side

