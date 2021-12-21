import React from "react";
import { Fragment, useEffect, useState } from "react";
import { FaKey, FaLockOpen } from "react-icons/fa";
import { MdLockOpen } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import "./UpdatePassword.css";

function UpdatePassword({ history }) {
  const dispatch = useDispatch();

  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    let myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) dispatch(clearErrors);

    if (isUpdated) {
      history.push("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, isUpdated, history, loading, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h3 className="updatePasswordHeading">Update Password</h3>
              <form
                className="updatePasswordForm"
                encType="multipart/form-data"
                onSubmit={updatePasswordSubmit}
              >
                <div className="updatePassword">
                  <MdLockOpen />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    // value={updatePassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="updatePassword">
                  <FaLockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="updatePassword">
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
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default UpdatePassword;
