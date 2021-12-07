import React, { Fragment, useRef, useState } from "react";
import { FaEnvelopeOpen, FaLockOpen, FaUser } from "react-icons/fa";
import { MdLockOpen, MdMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import loader from "../layout/Loader/loader";
import "./LoginSignup.css";

function LoginSignup() {
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [User, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = User;

  const [Avatar, setAvatar] = useState();
  const [AvatarPreview, setAvatarPreview] = useState("/logo192.png");

  const loginSubmit = () => {
    console.log("Login Submit pressed");
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("Avatar", Avatar);
    myForm.set("password", password);

    console.log("Signup Submit pressed");
  };

  const registerDataChange = (e) => {
    if (e.target.name === "Avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...User, [e.target.name]: e.target.value });
    }
  };

  const switchTabs = (e, tab) => {
    if (tab == "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab == "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const [LoginEmail, setLoginEmail] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");

  return (
    <Fragment>
      <div className="LoginSignupContainer">
        <div className="LoginSignupBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MdMailOutline />
              <input
                type="email"
                placeholder="Email"
                required
                value={LoginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <MdLockOpen />
              <input
                type="password"
                placeholder="Password"
                required
                value={LoginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forgot">Forgot Password?</Link>
            <input type="submit" value="Login" className="loginBtn" />
          </form>
          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
              <FaUser />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>

            <div className="signUpEmail">
              <FaEnvelopeOpen />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>

            <div className="signUpPassword">
              <FaLockOpen />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>

            <div id="registerImage">
              <img src={AvatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="Avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>
            <input
              type="submit"
              value="Register"
              className="signUpBtn"
              // disabled={loading ? true : false}
            />
          </form>
        </div>
      </div>
      ;
    </Fragment>
  );
}
export default LoginSignup;
