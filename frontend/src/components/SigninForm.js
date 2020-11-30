import React, { useState } from "react";
import Button from "./Button";
import { useAuth } from "../hooks/useAuth";

const SigninForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const { signin, toggleModal } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO: Login process and set AuthState
    setIsButtonLoading(true);
    signin(formData)
      .then(() => {
        //setIsButtonLoading(false);

        /**close the modal */
        toggleModal();
      })
      .catch((e) => {
        setIsButtonLoading(false);
        alert(e.message);
      });
  };

  const handleChange = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;

    setFormData({ ...formData, [target.name]: value });
  };

  return (
    <div className="card-content">
      <div className="has-text-centered p-4">
        <h1 className="is-size-4 has-text-weight-semibold is-mt-3">
          Welcome back, Sign in to continue
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
              required={true}
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
              value={formData.password}
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input
                type="checkbox"
                name="remember"
                value={formData.remember}
                onChange={handleChange}
              ></input>
              Remember me
            </label>
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
              Sign in
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
