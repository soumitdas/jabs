import React from "react";

const CheckoutDelivey = ({ address, setAddress, next }) => {
  const handleChange = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    next("payment");
  };

  return (
    <div className="box">
      <h1 className="title is-4">Delivery Address</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="name"
              placeholder="John Corner"
              value={address.name}
              onChange={handleChange}
              required={true}
            ></input>
          </div>
        </div>
        <div className="field">
          <label className="label">Street</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="street"
              placeholder="Appartment Name, Street etc"
              value={address.street}
              onChange={handleChange}
              required={true}
            ></input>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="field">
            <label className="label">City</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="city"
                placeholder="Eg Kolkata"
                value={address.city}
                onChange={handleChange}
                required={true}
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">State</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="state"
                placeholder="Bihar"
                value={address.state}
                onChange={handleChange}
                required={true}
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">PIN</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="pin"
                placeholder="700001"
                value={address.pin}
                onChange={handleChange}
                required={true}
              ></input>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Contact No</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="contactNo"
              placeholder="888888888"
              value={address.contactNo}
              onChange={handleChange}
              required={true}
            ></input>
          </div>
        </div>
        <div className="field">
          <div className="control is-expanded">
            <button type="submit" className="button is-link is-fullwidth">
              Proceed
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutDelivey;
