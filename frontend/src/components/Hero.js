import React from "react";

const Hero = ({ title = "Just Another Book Store" }) => {
  return (
    <section className="hero is-info">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">{title}</h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
