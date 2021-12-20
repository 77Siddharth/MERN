import React, { Fragment, useEffect, useState } from "react";
import { FaLockOpen, FaEnvelopeOpen, FaUser } from "react-icons/fa";
import { MdLockOpen, MdMailOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import Loader from "../layout/Loader/Loader";
import "./UpdateProfile.css";

function UpdateProfile({ history }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Avatar, setAvatar] = useState();
  const [AvatarPreview, setAvatarPreview] = useState(user.Avatar);

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    let myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("Avatar", Avatar);

    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (error) dispatch(clearErrors);
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.AvatarPreview);
    }
    if (isUpdated) {
      console.log("Profile updated successfully");
      dispatch(loadUser());
      history.push("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, isUpdated, history, loading, user]);

  return (
    <Fragment>
      <div className="updateProfileContainer">
        <div className="updateProfileBox">
          <form
            className="updateProfileForm"
            encType="multipart/form-data"
            onSubmit={updateProfileSubmit}
          >
            <div className="updateProfileName">
              <FaUser />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={updateProfileDataChange}
              />
            </div>

            <div className="updateProfileEmail">
              <FaEnvelopeOpen />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={updateProfileDataChange}
              />
            </div>
            <div id="registerImage">
              <img src={AvatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="Avatar"
                accept="image/*"
                onChange={updateProfileDataChange}
              />
            </div>
            <input
              type="submit"
              value="Update Profile"
              className="updateProfileBtn"
              // disabled={loading ? true : false}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default UpdateProfile;
