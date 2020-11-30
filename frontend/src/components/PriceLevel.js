import React from "react";

const PriceLevel = ({ textSize, left, right, capitalized = false }) => {
  return (
    <nav
      className={
        capitalized
          ? "level is-mobile has-text-weight-bold my-3"
          : "level is-mobile my-3"
      }
    >
      <div className="level-left">
        <div className="level-item">
          <p className={`is-size-${textSize}`}>{left}</p>
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          <p className={`is-size-${textSize}`}>{right}</p>
        </div>
      </div>
    </nav>
  );
};

export default PriceLevel;
