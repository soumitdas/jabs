import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const { signup, toggleModal } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO: Login process and set AuthState
    setIsButtonLoading(true);
    signup(formData)
      .then(() => {
        setIsButtonLoading(false);

        /**close the modal */
        toggleModal();
      })
      .catch((e) => {
        setIsButtonLoading(false);
        alert(e.message);
      });
  };

  const handleChange = ({ target }) =>
    setFormData({ ...formData, [target.name]: target.value });

  return (
    <div className="card-content">
      <div className="has-text-centered p-4">
        <h1 className="is-size-4 has-text-weight-semibold is-mt-3">
          New here ? Create an Account
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="name"
              autoComplete="on"
              placeholder="John Corner"
              minLength="3"
              value={formData.name}
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="email"
              name="email"
              autoComplete="on"
              required={true}
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              name="password"
              placeholder="********"
              required={true}
              minLength="5"
              value={formData.password}
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <Button
              type="info"
              fullWidth={true}
              loading={isButtonLoading}
              disabled={isButtonLoading}
            >
              Sign up
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
