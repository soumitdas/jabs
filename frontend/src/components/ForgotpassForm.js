import React, { useState } from "react";
import Button from "./Button";
import authApi from "../api/auth";

const ForgotpassForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    authApi
      .forgotPassword(email)
      .then((resp) => {
        setIsLoading(false);
        setEmail("");
        alert(resp.message);
      })
      .catch((e) => {
        setIsLoading(false);
        alert(e.message);
      });
  };

  return (
    <div className="card-content">
      <div className="has-text-centered p-4">
        <h1 className="is-size-4 has-text-weight-semibold is-mt-3">
          Reset your Password
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="email"
              name="email"
              autoComplete="on"
              placeholder="name@example.com"
              value={email}
              onChange={handleChange}
              required={true}
            ></input>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <Button
              type="info"
              fullWidth={true}
              loading={isLoading}
              disabled={isLoading}
            >
              Send Password Reset Email
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotpassForm;
