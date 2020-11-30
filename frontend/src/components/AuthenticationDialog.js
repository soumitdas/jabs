import React, { useState, useEffect } from "react";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import ForgotpassForm from "./ForgotpassForm";

const AuthenticationDialog = ({ formType = "signin", ...rest }) => {
  const [authFormType, setAuthFormType] = useState(formType);

  return (
    <div className="card">
      {authFormType === "signin" && <SigninForm {...rest} />}
      {authFormType === "signup" && <SignupForm {...rest} />}
      {authFormType === "forgot" && <ForgotpassForm {...rest} />}
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
