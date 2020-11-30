import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import SinginToContinue from "../../components/SigninToContinue";

const AdminRoute = ({ children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={() =>
        auth.user && auth.user.role === "admin" ? (
          children
        ) : (
          <SinginToContinue />
        )
      }
    />
  );
};

export default AdminRoute;
