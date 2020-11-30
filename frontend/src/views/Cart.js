import React from "react";
import { Link } from "react-router-dom";

import PriceLevel from "../components/PriceLevel";
import { useCart } from "../hooks/useCart";
import CartItem from "../components/CartItem";

import { ReactComponent as EmptyCart } from "../assets/images/empty_cart.svg";

const Cart = () => {
  const { cartItems, subTotal } = useCart();

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="box">
              <h1 className="title">Cart</h1>
              <hr />
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <CartItem key={index} itemData={item} />
                ))
              ) : (
                <div className="has-text-centered">
                  <EmptyCart height="150" width="150" />
                  <p className="subtitle">Cart is Empty....</p>
                  <Link to="/" className="button is-link">
                    Back to Store
                  </Link>
                </div>
              )}
              <hr />
              <Link to="/" className="button">
                Back to Store
              </Link>
              {/* <div className="field is-horizontal">
                <div className="field-label is-small">
                  <label className="label">Promo Code (if-any)</label>
                </div>
                <div className="field-body">
                  <div className="field is-grouped">
                    <p className="control">
                      <input className="input is-small" type="text"></input>
                    </p>
                    <p className="control">
                      <a className="button is-link is-small">Apply</a>
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          {cartItems.length > 0 && (
            <div className="column is-one-third">
              <div className="box">
                <h1 className="title is-4">Price Details</h1>
                <hr />
                <PriceLevel
                  textSize="5"
                  left="Subtotal"
                  right={`₹ ${subTotal}`}
                />
                <PriceLevel textSize="5" left="GST" right="₹ 0" />
                {/* <PriceLevel textSize="5" left="Discounts" right="(-) 50" /> */}
                <hr />
                <PriceLevel
                  textSize="5"
                  left="Total Price"
                  right={`₹ ${subTotal}`}
                  capitalized={true}
                />
              </div>
              <Link
                className="button is-medium is-info is-fullwidth"
                to="/checkout"
              >
                Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
