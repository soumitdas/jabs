import React, { useState, useEffect } from "react";
import orderApi from "../../api/order";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ReactComponent as SomethingWrongSvg } from "../../assets/images/something_wrong.svg";
import CheckoutProductCard from "../../components/CheckoutProductCard";
import PriceLevel from "../../components/PriceLevel";
import Button from "../../components/Button";

const OrderCancelForm = ({ handleSubmit, loading }) => {
  const [remarks, setRemarks] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit("cancel", { remarks });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="field">
        <label className="label">Remarks</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Why cancelling the order ?"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
      </div>
      <Button type="danger" loading={loading} disabled={loading}>
        Cancel
      </Button>
    </form>
  );
};

const OrderApproveForm = ({ handleSubmit, loading }) => {
  return (
    <Button
      onClick={() => handleSubmit("approve")}
      loading={loading}
      disabled={loading}
      type="success"
    >
      Approve
    </Button>
  );
};

const OrderShipmentForm = ({ handleSubmit, loading }) => {
  const [formData, setFormData] = useState({
    provider: "",
    trackingId: "",
    remarks: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit("shipment", {
      shipment: {
        provider: formData.provider,
        trackingId: formData.trackingId,
      },
      remarks: formData.remarks,
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="field">
        <label className="label">Shipping Provider</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="provider"
            placeholder="Bluedart"
            value={formData.provider}
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Tracking No</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="trackingId"
            placeholder="25169845815"
            value={formData.trackingId}
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Remarks</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="remarks"
            placeholder="(optional)"
            value={formData.remarks}
            onChange={handleChange}
          />
        </div>
      </div>
      <Button loading={loading} disabled={loading} type="link">
        Submit
      </Button>
    </form>
  );
};

const TrackOrderAdmin = () => {
  const { orderId } = useParams();
  const auth = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [action, setAction] = useState("");

  const handleChange = (e) => setAction(e.target.value);

  const handleOrder = (action, data) => {
    setIsOrderLoading(true);
    orderApi
      .processOrder(order._id, action, data, auth.token)
      .then((resp) => {
        setIsOrderLoading(false);
        setOrder(resp.data);
        setAction("");
      })
      .catch((e) => {
        setIsOrderLoading(false);
        alert(e.message);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    orderApi
      .getOrderByIdAdmin(orderId, auth.token)
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
            <Link to="/admin/orders">Back to orders</Link>
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
            <div className="column is-3">
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
              {order.payment.reference && (
                <>
                  <PriceLevel
                    textSize="7"
                    left="Payment#"
                    right={order.payment.reference.paymentId}
                  />
                  <PriceLevel
                    textSize="7"
                    left="Order#"
                    right={order.payment.reference.orderId}
                  />
                </>
              )}
            </div>
            <div className="column is-5">
              <h3 className="title is-6">User Details</h3>
              <PriceLevel textSize="6" left="User Id" right={order.user._id} />
              <PriceLevel textSize="6" left="Name" right={order.user.name} />
              <PriceLevel textSize="6" left="Email" right={order.user.email} />
            </div>
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
          <hr />
          <h3 className="title is-6">Process Order</h3>
          <div className="field">
            <label className="label">Action</label>
            <div className="control">
              <div className="select">
                <select onChange={handleChange}>
                  <option value={""}>Select dropdown</option>
                  <option value="approve">Approve Order</option>
                  <option value="cancel">Cancel Order</option>
                  <option value="shipment">Add Shipment</option>
                </select>
              </div>
            </div>
          </div>
          {action === "approve" && (
            <OrderApproveForm
              handleSubmit={handleOrder}
              loading={isOrderLoading}
            />
          )}
          {action === "cancel" && (
            <OrderCancelForm
              handleSubmit={handleOrder}
              loading={isOrderLoading}
            />
          )}
          {action === "shipment" && (
            <OrderShipmentForm
              handleSubmit={handleOrder}
              loading={isOrderLoading}
            />
          )}
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

export default TrackOrderAdmin;
