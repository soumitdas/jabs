import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { useAuth } from "../hooks/useAuth";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import ForgotpassForm from "./ForgotpassForm";

const AuthenticationDialog = ({ formType = "signin", ...rest }) => {
  const [authFormType, setAuthFormType] = useState(formType);

  const { googleSignin, toggleModal } = useAuth();

  const responseGoogle = (response) => {
    googleSignin(response.tokenId)
      .then(() => {
        /**close the modal */
        toggleModal();
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <div className="card">
      {authFormType === "signin" && <SigninForm {...rest} />}
      {authFormType === "signup" && <SignupForm {...rest} />}
      {authFormType === "forgot" && <ForgotpassForm {...rest} />}
      {authFormType !== "forgot" && (
        <div className="has-text-centered pb-4">
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Continue with Google"
            onSuccess={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      )}
      <div className="card-footer">
        {authFormType === "signin" && (
          <div className="card-footer-item has-text-centered is-size-6 is-inline-block">
            <span>
              Forgot your password?{" "}
              <a onClick={() => setAuthFormType("forgot")}>Click Here</a> to
              reset
            </span>
            <br />
            <span>
              Don't have an account?{" "}
              <a onClick={() => setAuthFormType("signup")}>Click Here</a> to
              create one
            </span>
          </div>
        )}
        {authFormType === "signup" && (
          <div className="card-footer-item has-text-centered is-size-6 is-inline-block">
            <span>
              Already have an account?{" "}
              <a onClick={() => setAuthFormType("signin")}>Click Here</a> to
              Sign in
            </span>
          </div>
        )}
        {authFormType === "forgot" && (
          <div className="card-footer-item has-text-centered is-size-6 is-inline-block">
            <span>
              Don't have an account?{" "}
              <a onClick={() => setAuthFormType("signup")}>Click Here</a> to
              create one
            </span>
            <br />
            <span>
              Back to <a onClick={() => setAuthFormType("signin")}>Sign in</a>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthenticationDialog;
