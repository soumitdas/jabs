import React from "react";

const Button = ({
  type,
  size = "normal",
  loading,
  disabled,
  static: isStatic,
  rounded,
  fullWidth,
  onClick,
  children,
}) => (
  <button
    type="submit"
    className={`button is-${type} is-${size} ${fullWidth && "is-fullwidth"} ${
      rounded && "is-rounded"
    } ${loading && "is-loading"} ${isStatic && "is-static"}`}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
