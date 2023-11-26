import React from "react";
import "./styles.css";
// import { useState } from "react";

function Input({ label, state, setState, placeholder, type }) {
  return (
    <div className="imput-wrapper">
      <p className="label-input">{label}</p>
      <input
        type={type}
        value={state}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
        className="custom-input"
      />
    </div>
  );
}

export default Input;
