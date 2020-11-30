import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";
import orderApi from "../api/order";

import { ReactComponent as OrderConfirmedSvg } from "../assets/images/order_confirmed.svg";
import { ReactComponent as SomethingWrongSvg } from "../assets/images/something_wrong.svg";
import logo from "../assets/images/jabs_logo.png";
import { Link } from "react-router-dom";

const CheckoutConfirm = ({ orderObj, setOrder, emptyCart }) => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => emptyCart();
  }, []);

  const handlePayment = (rpResp) => {
    //console.log(rpResp);
    setIsLoading(true);
    orderApi
      .orderPaymentConfirm(rpResp, orderObj._id, auth.token)
      .then((resp) => {
        setOrder(resp.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        alert(e.message);
      });
  };

  const displayRazorpay = () => {
    if (!window.Razorpay) {
      alert("Something went wrong. Try again");
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: orderObj.payment.reference.amount.toString(),
      currency: "INR",
      name: "JABS",
      description: "Just Another Book Store",
      image: logo,
      order_id: orderObj.payment.reference.orderId,
      handler: handlePayment,
      prefill: {
        name: auth.user.name,
        email: auth.user.email,
        contact: orderObj.shipping.contactNo,
      },
      theme: {
        color: "#3298dc",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (!orderObj) {
    return (
      <div className="box">
        <h1 className="title is-4">Confirmation</h1>
        <hr />
        <div className="has-text-centered">
          <SomethingWrongSvg height="120" width="120" />
          <h2 className="title is-5">Something went wrong</h2>
          <p className="subtitle is-5 ">
            Please restart the checkout process again
          </p>
          <p className="is-size-6 m-4">
            Back to the <Link to="/">Store</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="box">
      <h1 className="title is-4">Confirmation</h1>
      <hr />
      {orderObj.status === "payment-pending" && (
        <div className="has-text-centered">
          <Button
            type="link"
            onClick={() => displayRazorpay()}
            loading={isLoading}
            disabled={isLoading}
          >
            Pay ₹ {orderObj.totalAmount}
          </Button>
        </div>
      )}
      {orderObj.status === "processing" && (
        <div className="has-text-centered">
          <OrderConfirmedSvg width="120" height="120" />
          <h2 className="title is-4">Congratulations</h2>
          <h3 className="subtitle is-5">
            Your Order has been placed successfully
          </h3>
          <p className="is-size-6 mb-5">
            <strong>Order ID</strong>: {orderObj._id}
          </p>
          <Link
            to={`/account/orders/${orderObj._id}`}
            className="button is-info"
          >
            View Order
          </Link>
          <p className="is-size-5 m-4">
            Back to the <Link to="/">Store</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default CheckoutConfirm;
