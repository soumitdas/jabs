# JABS Backend API Server

## Tech Stack

- NodeJs
- ExpressJs
- MongoDB

## API Routes

### /api/auth

- POST /signup to register new user
- POST /signin to authenticate a user
- POST /forgot-password to initiate password reset process
- POST /reset-password to complete the password reset
- POST /change-password to change user password (Auth)
- POST /verify to verify user email
- POST /google to authenticate a user using Google Oauth2

### /api/users

- GET / to get current logged-in user (Auth)
- PUT / to update current user (Auth)
- GET /all to get all users (Admin) [TODO: Paginate]
- GET /{userId} to get the user with `userId` (Admin)
- PUT /{userId} to update the user with `userId` (Admin)
- DELETE /{userId} to delete the user with `userId` (Admin)
- GET /cart to get User Cart (Auth)
- POST /cart to add/modify User Cart (Auth)
- PUT /cart to update User Cart (Auth)
- GET /orders to get All orders of that user (Auth)
- GET /orders/{orderId} to get order of that user with `orderId` (Auth)
- PUT /orders/{orderId} to update the order with `orderId` (Auth) [TDOD]

### /api/categories

- GET / to get all categories [TODO: Paginate]
- GET /{categoryId} to get the category with that id
- POST / to create new category (Admin)
- PUT /{categoryId} to change the category (Admin)
- DELETE /{categoryId} to delete the category (Admin)

### /api/products

- GET / to get all products [TODO: Paginate]
- GET /{productId} to get the product with that id
- POST / to create new product (Admin)
- PUT /{productId} to change the product (Admin)
- DELETE /{productId} to delete the product (Admin)

### /api/orders

- POST / to initiate and create new order (Auth)
- POST /{orderId}/confirm-payment to confirm payment of `orderId` (Auth)
- POST /{orderId}/confirm-cod to confirm payment of `orderId` (Auth) [TODO: Future]
- GET / to get all order details (Admin) [TODO: Paginate]
- GET /{orderId} to get order details with `orderId` (Admin)
- PUT /{orderId} to update order details with `orderId` (Admin)
- DELETE /{orderId} to delete an order with `orderId` (Admin) [TODO]

## TODOs

- Implement Automated Testing
- Implement Automated Deployment
