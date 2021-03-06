import React, { Fragment, useEffect, useRef, useState } from "react";
import { FaEnvelopeOpen, FaLockOpen, FaUser } from "react-icons/fa";
import { MdLockOpen, MdMailOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login, register } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import "./LoginSignup.css";

function LoginSignup({ history, location }) {
  const dispatch = useDispatch();

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [User, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const { name, email, password } = User;

  const [avatar, setavatar] = useState();
  const [avatarPreview, setavatarPreview] = useState("/logo192.png");

  const [LoginEmail, setLoginEmail] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(LoginEmail, LoginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    let myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    myForm.set("password", password);

    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setavatarPreview(reader.result);
          setavatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...User, [e.target.name]: e.target.value });
    }
  };

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      console.log("Error:", error);
    }
    if (isAuthenticated) history.push(redirect);
  }, [dispatch, isAuthenticated, history, loading]);

  return loading ? (
    <Loader />
  ) : (
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
              <img src={avatarPreview} alt="avatar Preview" />
              <input
                type="file"
                name="avatar"
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
    </Fragment>
  );
}
export default LoginSignup;
