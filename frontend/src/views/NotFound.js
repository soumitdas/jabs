import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as NotFoundFig } from "../assets/images/page_not_found.svg";

const NotFound = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="has-text-centered">
          <NotFoundFig height="300" width="300" />
          <h1 className="title is-3">Page Not found</h1>
          <Link to="/" className="button is-link">
            Back to Store
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
