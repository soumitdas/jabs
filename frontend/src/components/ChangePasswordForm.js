import React, { useState } from "react";
import Button from "./Button";

const ChangePasswordForm = ({ handlePasswordChange }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const clearInputs = () => {
    setFormData({
      oldPassword: "",
      newPassword: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.oldPassword === formData.newPassword) {
      alert("New password & Current password cannot be same");
      clearInputs();
      return;
    }
    setIsButtonLoading(true);
    handlePasswordChange(formData)
      .then((resp) => {
        setIsButtonLoading(false);
        alert(resp.message);
        clearInputs();
      })
      .catch((e) => {
        setIsButtonLoading(false);
        alert(e.message);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Old Password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            name="oldPassword"
            required={true}
            value={formData.oldPassword}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">New Password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            name="newPassword"
            required={true}
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <Button
            type="info"
            loading={isButtonLoading}
            disabled={
              isButtonLoading || !(formData.oldPassword && formData.newPassword)
            }
          >
            Change
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
