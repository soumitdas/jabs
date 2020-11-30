import React, { useState, useEffect } from "react";
import orderApi from "../../api/order";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ReactComponent as SomethingWrongSvg } from "../../assets/images/something_wrong.svg";
import CheckoutProductCard from "../../components/CheckoutProductCard";
import PriceLevel from "../../components/PriceLevel";

const TrackOrder = () => {
  const { orderId } = useParams();
  const auth = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    orderApi
      .getOrderById(orderId, auth.token)
      .then((resp) => {
        setOrder(resp.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setOrder(null);
        alert(e.message);
      });
  }, [auth.token]);

  return (
    <>
      <h1 className="title is-4">Order # {orderId}</h1>
      <hr />
      {isLoading ? (
        <p className="subtitle is-5 has-text-centered">Loading...</p>
      ) : order ? (
        <>
          <div className="block">
            <Link to="/account/orders">Back to orders</Link>
          </div>
          <div className="columns is-variable is-4">
            <div className="column">
              <h3 className="title is-6">Delivery Address</h3>
              <p className="is-size-6">
                <strong>{order.shipping.name}</strong>
              </p>
              <p className="is-size-6">{order.shipping.street}</p>
              <p className="is-size-6">
                {order.shipping.city}, {order.shipping.state} -{" "}
                {order.shipping.pin}
              </p>
              {order.shipping.contactNo && (
                <p className="is-size-6">
                  Contact No: {order.shipping.contactNo}
                </p>
              )}
            </div>
            <div className="column">
              <h3 className="title is-6">Payment Summary</h3>
              <PriceLevel
                textSize="6"
                left="Method"
                right={order.payment.method}
              />
              <PriceLevel
                textSize="6"
                left="Status"
                right={order.payment.status}
              />
              {/* {order.payment.status === "pending" && (
                <button className="button is-small is-info">Retry</button>
              )} */}
            </div>
            {/* <div className="column is-3">
              <div className="buttons">
                <button className="button is-small is-danger">
                  Cancel Order
                </button>
                <button className="button is-small is-info">
                  Download Invoice
                </button>
              </div>
            </div> */}
          </div>
          <hr />
          <div className="columns is-variable is-4">
            <div className="column">
              <h3 className="title is-6">Products Summary</h3>
              {order.items.map((item, index) => (
                <CheckoutProductCard key={index} itemData={item} />
              ))}
            </div>
            <div className="column is-4">
              <h3 className="title is-6">Price Summary</h3>
              <PriceLevel
                textSize="6"
                left="Subtotal"
                right={`₹ ${order.subTotal}`}
              />
              <PriceLevel
                textSize="6"
                left="Shipping Charge"
                right={`₹ ${order.shippingCharges}`}
              />
              <PriceLevel
                textSize="6"
                left="Tax"
                right={`₹ ${order.taxAmount}`}
              />
              <PriceLevel
                textSize="6"
                left="Total"
                right={`₹ ${order.totalAmount}`}
              />
            </div>
          </div>
          <hr />
          <h3 className="title is-6">Tracking</h3>
          <div className="table-container">
            <table className="table is-bordered is-fullwidth">
              <thead>
                <tr>
                  <th>Date and Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              {order.events.map((event, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{new Date(event.date).toLocaleString()}</td>
                    <td>{event.remarks}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </>
      ) : (
        <div className="has-text-centered">
          <SomethingWrongSvg height="120" width="120" />
          <h2 className="title is-5">Something went wrong</h2>
          <p className="is-size-6 m-4">
            Back to the <Link to="/">Store</Link>
          </p>
        </div>
      )}
    </>
  );
};

export default TrackOrder;
