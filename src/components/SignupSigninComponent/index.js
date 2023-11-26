import React from "react";
import "./styles.css";
import Input from "../Input";
import { useState } from "react";
import Button from "../Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [loading, setLoading] = useState("");

  // const auth = getAuth();

  function signupWithEmail() {
    setLoading(true);
    console.log("johnson");
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmpassword !== ""
    ) {
      if (password === confirmpassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            toast.success("User created");
            console.log("User: ", user);
            setLoading(false);
            setEmail("");
            setName("");
            setPassword("");
            setConfirmpassword("");
            createDoc(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Password and Confirm Password doesnot match");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  function createDoc(user) {
    console.log(user);
  }

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
          type={email}
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder={"johndoe@gmail.com"}
        />
        <Input
          type="password"
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder={"Example 123"}
        />
        <Input
          type="password"
          label={"ConfirmPassword"}
          state={confirmpassword}
          setState={setConfirmpassword}
          placeholder={"Example 123"}
        />
        <Button
          disabled={loading}
          text={loading ? "Loading...." : "Signup Using Email and Password"}
          onClick={signupWithEmail}
        />
        <p style={{ textAlign: "center", margin: 0 }}>or</p>
        <Button
          text={loading ? "Loading ..." : "Signup Using Google"}
          blue="true"
        />
      </form>
    </div>
  );
}

export default SignupSigninComponent;
