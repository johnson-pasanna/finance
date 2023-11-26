import React from "react";
import "./styles.css";
import Input from "../Input";
import { useState } from "react";

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Signup on <span style={{ color: "var(--theme)" }}> 💰 Financely</span>
      </h2>
      <form>
        <Input
          label={"Full Name"}
          state={name}
          setState={setName}
          placeholder={"John Doe"}
        />
        <Input
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder={"johndoe@gmail.com"}
        />
        <Input
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder={"Example 123"}
        />
        <Input
          label={"ConfirmPassword"}
          state={confirmpassword}
          setState={setConfirmpassword}
          placeholder={"Example 123"}
        />
      </form>
    </div>
  );
}

export default SignupSigninComponent;
