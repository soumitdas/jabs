import React from "react";
import Routes from "./routes";
import { ProvideAuth } from "./hooks/useAuth";
import { ProvideCart } from "./hooks/useCart";

const App = () => {
  return (
    <ProvideAuth>
      <ProvideCart>
        <Routes />
      </ProvideCart>
    </ProvideAuth>
  );
};

export default App;
