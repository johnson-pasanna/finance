import React from "react";
import "./styles.css";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import userImg from "../../assets/user.svg";

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  function logoutFnc() {
    try {
      signOut(auth)
        .then(() => {
          toast.success("logged out Sucessfully!");
          navigate("/");
        })
        .catch((error) => {
          toast.error("Logged out Sucessfully");
        });
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <div className="navbar">
      <p className="logo">
        <span style={{ fontSize: "1.75rem" }}>💰</span>
        Financely.
      </p>
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img
            src={user.photoURL ? user.photoURL : userImg}
            alt="User Pic"
            style={{ borderRadius: "50%", height: "2rem", width: "2rem" }}
          />

          <p className="logo link" onClick={logoutFnc}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;

// import React, { useEffect } from "react";
// import "./styles.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../../firebase";
// import userSvg from "../../assets/user.svg";
// function Header() {
//   const [user] = useAuthState(auth);
//   const navigate = useNavigate();
//   function logout() {
//     auth.signOut();
//     navigate("/");
//   }

//   useEffect(() => {
//     if (!user) {
//       navigate("/");
//     } else {
//       navigate("/dashboard");
//     }
//   }, [user, navigate]);

//   return (
//     <div className="navbar">
//       <p className="navbar-heading">Financly.</p>
//       {user ? (
//         <p className="navbar-link" onClick={logout}>
//           <span style={{ marginRight: "1rem" }}>
//             <img
//               src={user.photoURL ? user.photoURL : userSvg}
//               width={user.photoURL ? "32" : "24"}
//               style={{ borderRadius: "50%" }}
//             />
//           </span>
//           Logout
//         </p>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// }
