import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import authApi from "../api/auth";
import Button from "../components/Button";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AuthVerify = () => {
  const query = useQuery();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const type = query.get("type");
  const uid = query.get("uid");
  const key = query.get("key");

  useEffect(() => {
    if (type === "email") {
      handleVerify();
    }
  }, []);

  const handleVerify = () => {
    setIsLoading(true);
    authApi
      .verifyEmail(uid, key)
      .then((resp) => {
        setResponse(resp.message);
        setIsLoading(false);
      })
      .catch((e) => {
        setResponse(e.message);
        setIsLoading(false);
      });
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setIsButtonLoading(true);
    authApi
      .resetPassword(uid, key, newPassword)
      .then((resp) => {
        alert(resp.message);
        setIsButtonLoading(false);
        history.replace("/");
      })
      .catch((e) => {
        //setResponse(e.message);
        alert(e.message);
        setIsButtonLoading(false);
      });
  };

  if (!type || !uid || !key) {
    return (
      <section className="section">
        <div className="container">
          <h2 className="subtitle is-4 has-text-centered">Invalid URL</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        {response ? (
          <h2 className="subtitle is-4 has-text-centered">{response}</h2>
        ) : isLoading ? (
          <h2 className="subtitle is-4 has-text-centered">Loading...</h2>
        ) : (
          type === "reset-password" && (
            <>
              <h2 className="subtitle is-4 has-text-centered">
                Password Reset Form
              </h2>
              <form onSubmit={handlePasswordReset}>
                <div className="field">
                  <label className="label">New Password</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      name="newPassword"
                      placeholder="**********"
                      required={true}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <Button
                      type="info"
                      loading={isButtonLoading}
                      disabled={isButtonLoading}
                    >
                      Reset my Password
                    </Button>
                  </div>
                </div>
              </form>
            </>
          )
        )}
      </div>
    </section>
  );
};
export default AuthVerify;
