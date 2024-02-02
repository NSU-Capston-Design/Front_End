import React from "react";
import "../css/Button.css";

function Button({ disabled, size, variant, onClick, children }) {
  const sizeClass = `button-${size || "md"}`;
  const variantClass = `button-${variant || "default"}`;

  return (
    <button
      className={`button ${sizeClass} ${variantClass}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
