import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import SinginToContinue from "../../components/SigninToContinue";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const UserAuthRoute = ({ children, ...rest }) => {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={() => (auth.user ? children : <SinginToContinue />)}
    />
  );
};

export default UserAuthRoute;
