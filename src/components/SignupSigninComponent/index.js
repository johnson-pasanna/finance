import React from "react";
import "./styles.css";
import Input from "../Input";
import { useState } from "react";
import Button from "../Button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [loading, setLoading] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

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
            navigate("/dashboard ");
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

  async function createDoc(user) {
    setLoading(true);
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("doc already exists");
      setLoading(false);
    }
  }

  function loginUsingEmail() {
    console.log("Email", email);
    console.log("password:", password);
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User Logged In");
          console.log("User logged in", user);
          setLoading(false);
          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }

  function googleAuth() {
    setLoading(true);

    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("user >>>", user);
          createDoc(user);
          setLoading(false);
          navigate("/dashboard");
          toast.success("User Authenticated");
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          setLoading(false);
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } catch (e) {
      toast.error(e.message);
    }
    // const auth = getAuth();
  }

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login on
            <span style={{ color: "var(--theme)" }}> 💰 Financely</span>
          </h2>
          <form>
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

            <Button
              disabled={loading}
              text={loading ? "Loading...." : "Login Using Email and Password"}
              onClick={loginUsingEmail}
            />
            <p style={{ textAlign: "center", margin: 0 }}>or</p>
            <Button
              onClick={googleAuth}
              text={loading ? "Loading ..." : "Login Using Google"}
              blue="true"
            />
            <p
              style={{
                textAlign: "center",
                margin: 0,
                fontWeight: "400",
                cursor: "pointer",
              }}
              onClick={() => setLoginForm(!loginForm)}
            >
              {" "}
              or don't Have an account?
              <span style={{ color: "blue" }}> click here</span>
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Signup on{" "}
            <span style={{ color: "var(--theme)" }}> 💰 Financely</span>
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
              onClick={googleAuth}
              text={loading ? "Loading ..." : "Signup Using Google"}
              blue="true"
            />
            <p
              style={{
                textAlign: "center",
                margin: 0,
                fontWeight: "400",
                cursor: "pointer",
              }}
              onClick={() => setLoginForm(!loginForm)}
            >
              or Have an account?{" "}
              <span style={{ color: "blue" }}> click here</span>
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default SignupSigninComponent;
