import React from "react";
import "../css/Button.css";

function Button({ disabled, size, variant, children }) {
  const sizeClass = `button-${size || "md"}`;
  const variantClass = `button-${variant || "default"}`;

  return (
    <button
      className={`button ${sizeClass} ${variantClass}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
