import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ data, categories = [] }) => {
  return (
    <div className="card">
      <div className="card-image">
        {data.images && data.images.length > 0 ? (
          <figure className="image is-4by3">
            <img src={data.images[0].url} alt={data.images[0].name}></img>
          </figure>
        ) : (
          <h1>No image</h1>
        )}
      </div>
      <div className="card-content">
        <Link
          to={`/product/${data._id}`}
          className="is-size-5 has-text-weight-bold mb-2"
        >
          {data.name}
        </Link>
        {/* <p className="is-size-5 has-text-weight-bold mb-2">{name}</p> */}
        {data.price === data.offerPrice ? (
          <p>
            <span className="is-size-6 has-text-weight-bold">
              ₹ {data.price}
            </span>
          </p>
        ) : (
          <p>
            <span className="is-size-6 has-text-weight-bold">
              ₹ {data.offerPrice}
            </span>
            <span className="is-size-7 has-text-grey ml-3">
              <s>₹ {data.price}</s>
            </span>
            <span className="has-text-success-dark has-text-weight-semibold is-size-7 ml-3">
              {Math.floor(
                ((Number(data.price) - Number(data.offerPrice)) /
                  Number(data.price)) *
                  100
              )}
              % off
            </span>
          </p>
        )}
        <div className="tags">
          {categories.map((category, i) => (
            <span key={i} className="tag is-warning mt-2">
              {category}
            </span>
          ))}
        </div>
      </div>
      {/* <footer className="card-footer">
        <p className="card-footer-item is-paddingless">
          <Link
            to={`/product/${id}`}
            className="button is-info is-light is-fullwidth"
          >
            View More
          </Link>
        </p>
      </footer> */}
    </div>
  );
};

export default ProductCard;
