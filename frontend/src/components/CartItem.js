import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const CartItem = ({ itemData }) => {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(itemData.quantity);

  const handleRemove = () => addToCart(itemData.product, 0);

  const handleQtyChange = (e) => {
    setQty(e.target.value);
    addToCart(itemData.product, e.target.value - itemData.quantity);
  };

  return (
    <div className="columns is-mobile">
      <div className="column is-narrow">
        <figure className="image is-96x96">
          <img
            src={itemData.product.images[0].url}
            alt={itemData.product.images[0].fileName}
          ></img>
        </figure>
      </div>
      <div className="column">
        <Link
          className="has-text-weight-bold is-size-5"
          to={`/product/${itemData.product._id}`}
        >
          {itemData.product.name}
        </Link>
        {itemData.product.price === itemData.product.offerPrice ? (
          <div className="block">
            <span className="is-size-6 has-text-weight-bold">
              ₹ {itemData.product.price}
            </span>
          </div>
        ) : (
          <div className="block">
            <p className="has-text-success-dark has-text-weight-semibold is-size-6">
              Special price
            </p>
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
        )}
        <div className="block">
          <div className="select is-small">
            <select value={qty} onChange={handleQtyChange}>
              <option value={1}>Qty: 1</option>
              <option value={2}>Qty: 2</option>
              <option value={3}>Qty: 3</option>
              <option value={4}>Qty: 4</option>
              <option value={5}>Qty: 5</option>
              <option value={6}>Qty: 6</option>
              <option value={7}>Qty: 7</option>
            </select>
          </div>
          <a
            onClick={handleRemove}
            className="is-size-6 has-text-weight-bold ml-2"
          >
            REMOVE
          </a>
        </div>
      </div>
      <div className="column is-narrow has-text-right">
        <h1 className="has-text-weight-bold is-size-5">
          ₹ {itemData.product.offerPrice * itemData.quantity}
        </h1>
      </div>
    </div>
  );
};

export default CartItem;
