import React from "react";
import { Fragment, useEffect, useState } from "react";
import { FaKey, FaLockOpen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import "./ResetPassword.css";

function ResetPassword({ history, match }) {
  const dispatch = useDispatch();

  const { error, loading, success } = useSelector(
    (state) => state.forgotPassword
  );

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    let myForm = new FormData();
    let password = newPassword;
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) dispatch(clearErrors);

    if (success) {
      history.push("/login");
    }
  }, [dispatch, success, history, loading, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Reset Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h3 className="resetPasswordHeading">Reset Password</h3>
              <form
                className="resetPasswordForm"
                encType="multipart/form-data"
                onSubmit={resetPasswordSubmit}
              >
                <div className="resetPassword">
                  <FaLockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="resetPassword">
                  <FaKey />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update Password"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ResetPassword;
