import React, { useState } from "react";
import CheckoutDelivey from "../components/CheckoutDelivery";
import CheckoutPayment from "../components/CheckoutPayment";
import CheckoutConfirm from "../components/CheckoutConfirm";
import PriceLevel from "../components/PriceLevel";
import CheckoutProductCard from "../components/CheckoutProductCard";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";

import { ReactComponent as SomethingWrongSvg } from "../assets/images/something_wrong.svg";

const Checkout = () => {
  const { cartItems, emptyCart, subTotal } = useCart();
  const [navState, setNavState] = useState("shipping");
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    pin: "",
    contactNo: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [order, setOrder] = useState(null);

  const handleNext = (nextSection) => {
    if (navState === "confirm") {
      alert("Please complete the payment");
      return;
    }
    if (
      nextSection === "payment" &&
      !(shippingAddress.name && shippingAddress.street && shippingAddress.pin)
    ) {
      alert("Please enter the delivery address first");
      return;
    }
    // if (nextSection === "confirm" && !order) {
    //   return;
    // }
    setNavState(nextSection);
  };

  if (cartItems.length < 1) {
    return (
      <section className="section">
        <div className="container has-text-centered">
          <SomethingWrongSvg height="120" width="120" />
          <h2 className="title is-5">Something went wrong</h2>
          <p className="subtitle is-5 ">
            Please restart the checkout process again
          </p>
          <p className="is-size-6 m-4">
            Back to the <Link to="/">Store</Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <nav
              className="breadcrumb has-succeeds-separator"
              aria-label="breadcrumbs"
            >
              <ul>
                <li className="is-active">
                  <a>Signin</a>
                </li>
                <li className={navState === "shipping" ? "is-active" : null}>
                  <a onClick={() => handleNext("shipping")}>Delivery</a>
                </li>
                <li className={navState === "payment" ? "is-active" : null}>
                  <a onClick={() => handleNext("payment")}>Payment</a>
                </li>
                <li className={navState === "confirm" ? "is-active" : null}>
                  <a aria-current="page">Confirm</a>
                </li>
              </ul>
            </nav>
            {navState === "shipping" && (
              <CheckoutDelivey
                address={shippingAddress}
                setAddress={setShippingAddress}
                next={handleNext}
              />
            )}
            {navState === "payment" && (
              <CheckoutPayment
                address={shippingAddress}
                payment={paymentMethod}
                setPayment={setPaymentMethod}
                next={handleNext}
                setOrder={setOrder}
              />
            )}
            {navState === "confirm" && order && (
              <CheckoutConfirm
                orderObj={order}
                setOrder={setOrder}
                emptyCart={emptyCart}
              />
            )}
          </div>
          <div className="column is-two-fifths">
            <div className="box">
              <h1 className="title is-4">Order Summary</h1>
              <hr />
              {cartItems.map((item, index) => (
                <CheckoutProductCard key={index} itemData={item} />
              ))}
              <hr />
              <PriceLevel
                textSize="6"
                left="Subtotal"
                right={`₹ ${subTotal}`}
              />
              {order && (
                <>
                  <PriceLevel
                    textSize="6"
                    left="Delivery Charge"
                    right={`₹ ${order.shippingCharges}`}
                  />
                  <PriceLevel
                    textSize="6"
                    left="GST"
                    right={`₹ ${order.taxAmount}`}
                  />
                  <hr />
                  <PriceLevel
                    textSize="5"
                    left="Total Price"
                    right={`₹ ${order.totalAmount}`}
                    capitalized={true}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
