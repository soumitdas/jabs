import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const SinginToContinue = () => {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.modal) {
      auth.toggleModal();
    }
    return () => {
      if (auth.modal) {
        auth.toggleModal();
      }
    };
  }, []);

  return (
    <section className="hero is-medium has-text-centered">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">I'm afraid, this is a restricted page</h1>
          <h2 className="subtitle">
            Please Sign-in with proper credentials to continue
          </h2>
          <Link to="/" className="button">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SinginToContinue;
