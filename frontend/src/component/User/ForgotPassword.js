import React, { Fragment, useEffect, useState } from "react";
import { FaEnvelopeOpen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { FORGOT_PASSWORD_RESET } from "../../constants/userConstants";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import "./ForgotPassword.css";

function ForgotPassword({ history }) {
  const dispatch = useDispatch();

  const { message, error, loading, isUpdated } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    let myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) dispatch(clearErrors);
    if (message) {
      history.push("/login");
      dispatch({
        type: FORGOT_PASSWORD_RESET,
      });
    }
  }, [dispatch, history, loading, error, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h3 className="forgotPasswordHeading">Forgot Password</h3>
              <form
                className="forgotPasswordForm"
                encType="application/json"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <FaEnvelopeOpen />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ForgotPassword;
