import React from "react";

const CheckoutProductCard = ({ itemData }) => {
  return (
    <div className="columns is-mobile">
      {itemData.product.images && (
        <div className="column is-narrow">
          <figure className="image is-64x64">
            <img
              src={itemData.product.images[0].url}
              alt={itemData.product.images[0].fileName}
            ></img>
          </figure>
        </div>
      )}
      <div className="column">
        <h1 className="has-text-weight-bold is-size-6">
          {itemData.product.name}
        </h1>
        {itemData.product.offerPrice !== itemData.product.price ? (
          <div className="block">
            <span className="is-size-6 has-text-weight-bold">
              ₹ {itemData.product.offerPrice}
            </span>
            <span className="is-size-7 has-text-grey ml-3">
              <s>₹ {itemData.product.price}</s>
            </span>
            <span className="has-text-success-dark has-text-weight-semibold is-size-7 ml-3">
              {Math.floor(
                ((Number(itemData.product.price) -
                  Number(itemData.product.offerPrice)) /
                  Number(itemData.product.price)) *
                  100
              )}
              % off
            </span>
          </div>
        ) : (
          <span className="is-size-6 has-text-weight-bold">
            ₹ {itemData.product.price}
          </span>
        )}
      </div>
      <div className="column is-narrow">
        <p className="is-size-6">x {itemData.quantity}</p>
      </div>
      <div className="column is-narrow">
        <p className="has-text-weight-bold is-size-6">
          ₹ {itemData.product.offerPrice * itemData.quantity}
        </p>
      </div>
    </div>
  );
};

export default CheckoutProductCard;
