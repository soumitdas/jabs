import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import DefaultLayout from "../layouts/Default";
import UserAccountLayout from "../layouts/UserAccount";
import UserAuthRoute from "./helper/UserAuth";

import HomeView from "../views/Home";
import ProductView from "../views/Product";
import Cart from "../views/Cart";
import Checkout from "../views/Checkout";
import UserDashboard from "../views/user/Dashboard";
import UserProfile from "../views/user/Profile";
import UserOrders from "../views/user/Orders";
import AdminOrders from "../views/admin/Orders";
import AdminProducts from "../views/admin/Products";
import AdminProductCategory from "../views/admin/ProductCategory";
import AdminRoute from "./helper/Admin";
import TrackOrder from "../views/user/TrackOrder";
import AuthVerify from "../views/AuthVerify";
import Terms from "../views/Terms";
import Privacy from "../views/Privacy";
import Refund from "../views/Refund";
import Disclaimer from "../views/Disclaimer";
import TrackOrderAdmin from "../views/admin/TrackOrder";
import AdminUsers from "../views/admin/Users";
import NotFound from "../views/NotFound";

const Routes = () => {
  return (
    <Router>
      <DefaultLayout>
        <Switch>
          <Route exact path="/">
            <HomeView />
          </Route>
          <Route path="/product/:id">
            <ProductView />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <UserAuthRoute path="/checkout">
            <Checkout />
          </UserAuthRoute>
          <UserAuthRoute path="/account">
            <UserAccountLayout>
              <Switch>
                <Route exact path="/account">
                  <Redirect to="/account/dashboard" />
                </Route>
                <Route path="/account/dashboard">
                  <UserDashboard />
                </Route>
                <Route exact path="/account/orders">
                  <UserOrders />
                </Route>
                <Route path="/account/orders/:orderId">
                  <TrackOrder />
                </Route>
                <Route path="/account/profile">
                  <UserProfile />
                </Route>
              </Switch>
            </UserAccountLayout>
          </UserAuthRoute>
          <AdminRoute path="/admin">
            <UserAccountLayout>
              <Switch>
                <Route exact path="/admin">
                  <h1>Hello Admin Dashboard</h1>
                </Route>
                <Route exact path="/admin/users">
                  <AdminUsers />
                </Route>
                <Route exact path="/admin/orders">
                  <AdminOrders />
                </Route>
                <Route path="/admin/orders/:orderId">
                  <TrackOrderAdmin />
                </Route>
                <Route path="/admin/products">
                  <AdminProducts />
                </Route>
                <Route path="/admin/categories">
                  <AdminProductCategory />
                </Route>
              </Switch>
            </UserAccountLayout>
          </AdminRoute>
          <Route path="/auth-verify">
            <AuthVerify />
          </Route>
          <Route path="/terms">
            <Terms />
          </Route>
          <Route path="/privacy">
            <Privacy />
          </Route>
          <Route path="/refund">
            <Refund />
          </Route>
          <Route path="/disclaimer">
            <Disclaimer />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </DefaultLayout>
    </Router>
  );
};

export default Routes;
