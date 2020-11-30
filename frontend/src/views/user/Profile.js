import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import ChangePasswordForm from "../../components/ChangePasswordForm";
import Button from "../../components/Button";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [isNameUpdateButtonLoading, setIsNameUpdateButtonLoading] = useState(
    false
  );
  const auth = useAuth();

  const handleNameUpdate = (e) => {
    e.preventDefault();
    setIsNameUpdateButtonLoading(true);
    auth
      .updateUserSelf({ name })
      .then((resp) => {
        setIsNameUpdateButtonLoading(false);
      })
      .catch((e) => {
        setIsNameUpdateButtonLoading(false);
        alert(e.message);
      });
  };

  return (
    <>
      <h1 className="title">Your Profile</h1>
      <hr />
      <div className="block">
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input is-static"
                  type="email"
                  value={auth.user.email}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input is-static"
                  type="text"
                  value={auth.user.name}
                />
              </div>
            </div>
          </div>
          <div className="column">
            <p className="is-size-5 has-text-centered">Update</p>
            {/* <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <div className="field is-grouped">
                  <p className="control is-expanded">
                    <input
                      className="input"
                      type="email"
                      placeholder="john@example.com"
                    />
                  </p>
                  <p className="control">
                    <a className="button is-info">Update</a>
                  </p>
                </div>
              </div>
            </div> */}
            <form className="field" onSubmit={handleNameUpdate}>
              <label className="label">Name</label>
              <div className="control">
                <div className="field is-grouped">
                  <p className="control is-expanded">
                    <input
                      className="input"
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="john@example.com"
                    />
                  </p>
                  <p className="control">
                    <Button
                      type="info"
                      loading={isNameUpdateButtonLoading}
                      disabled={isNameUpdateButtonLoading || !name}
                    >
                      Update
                    </Button>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        <hr />
        <h1 className="title is-4">Change your password</h1>
        <ChangePasswordForm handlePasswordChange={auth.changePassword} />
      </div>
    </>
  );
};

export default UserProfile;
