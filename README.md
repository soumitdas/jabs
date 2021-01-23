# JABS - A MERN stack e-commerce app

<p align="center">
  <img alt="screenshot of jabs" src="https://i.imgur.com/p5w8kGt.jpeg">
</p>

![Netlify](https://img.shields.io/netlify/f8eb0fbe-9203-4784-bd5e-9ecc8dfca006) ![GitHub language count](https://img.shields.io/github/languages/count/soumitdas/jabs) ![GitHub top language](https://img.shields.io/github/languages/top/soumitdas/jabs) ![Website](https://img.shields.io/website?url=https%3A%2F%2Fjabs.netlify.app%2F)

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [License](#license)
- [Disclaimer](#disclaimer)
- [Useful Links](#useful-links)

## Features

- JWT based Authentication
- Dedicated Admin Panel for Order processing
- Shopping Cart local state synchronized with server
- Payment Gateway integrated
- Cash on Delivery option available
- Email notification to the customer
- Order status tracking

## Demo

You can create an account at JABS to explore the checkout flow, or use the below credentials to Sign-in.

### Demo Credentials

- Email: customer@jabs.mern
- Password: superSecret545

### [Click here](https://jabs.netlify.app/) for the Live Demo

## Getting Started

### Get the repo

Download the .zip file from Github or run the below command to clone the repo locally.

```bash
git clone https://github.com/soumitdas/jabs.git
```

### Install dependencies

After cloning the repo, run the following commands to install the project dependencies:

```bash
# for frontend
cd frontend && npm install

# back to the root directory
cd ..

## for backend
cd backend && npm install
```

### Set environment

#### Frontend

Set the environment variable in `.env` file at `frontend` directory.

```bash
REACT_APP_API_BASE_URL=http://localhost:4000
REACT_APP_RAZORPAY_KEY=razorpay_public_key
REACT_APP_GOOGLE_CLIENT_ID=google_oauth_client_id_here
```

#### Backend

Rename `.env.sample` file in `backend` directory to `.env` and set the environment variables

```bash
FRONTEND_BASE_URL=http://localhost:3000
MONGODB_URI=
JWT_SECRET=super_secret
SMTP_USERNAME=
SMTP_PASSWORD=
AZURE_STORAGE_CONNECTION_STRING=
RAZORPAY_API_KEY=
RAZORPAY_API_SECRET=
GOOGLE_CLIENT_ID=
```

### Run

Open two terminal window to run both the frontend & backend and run the following commands:

#### Frontend

```bash
cd frontend && npm start
# React App will start at PORT 3000
```

#### Backend

```bash
cd backend && npm run dev
# Node API server will start at PORT 4000
```

Now open `http://localhost:3000/` to see the app running.

## License

JABS is [MIT licensed](http://opensource.org/licenses/MIT).

## Disclaimer

This project is in a very basic stage and might have severe bugs and vulnerabilities, so please keep that in mind when deploying it to production.

## Useful Links

- [React](https://reactjs.org/)
- [Node JS](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Bulma](https://bulma.io/)
