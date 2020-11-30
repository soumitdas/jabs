import React, { useState, useEffect } from "react";
import Button from "./Button";
import orderApi from "../api/order";
import { useAuth } from "../hooks/useAuth";

const CheckoutPayment = ({ address, payment, setPayment, setOrder, next }) => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    setPayment("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(payment);
    if (!(payment === "cod" || payment === "pg-razorpay")) {
      alert("Please select a payment method");
      return;
    }
    setIsLoading(true);
    orderApi
      .initOrder(address, payment, auth.token)
      .then((resp) => {
        setOrder(resp.data);
        setIsLoading(false);
        next("confirm");
      })
      .catch((e) => {
        setIsLoading(false);
        alert(e.message);
      });
  };

  const handleChange = (e) => {
    setPayment(e.target.value);
  };

  return (
    <div className="box">
      <h1 className="title is-4">Review and Payment</h1>
      <hr />
      <div className="block">
        <h1 className="title is-6">Your order will be delivered to</h1>
        <div className="subtitle is-5">
          <p className="has-text-weight-semibold">
            {address.name}, {address.contactNo}
          </p>
          <p>
            {address.street}, {address.city}, {address.state}, {address.pin}
          </p>
        </div>
      </div>
      <div className="block" onChange={handleChange}>
        <h1 className="title is-6">Select a Payment Method</h1>
        <div className="control">
          <label className="radio">
            <input
              type="radio"
              name="paymentMethod"
              value="pg-razorpay"
            ></input>
            Credit Card / Debit Card / Net Banking / UPI
          </label>
        </div>
        <div className="control">
          <label className="radio">
            <input type="radio" name="paymentMethod" value="cod"></input>
            Cash on Delivery
          </label>
        </div>
      </div>
      <div className="block">
        <Button
          type="link"
          fullWidth={true}
          onClick={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPayment;
