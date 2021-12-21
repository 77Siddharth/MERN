import React, { Fragment, useEffect, useState } from "react";
import { FaEnvelopeOpen, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import "./UpdateProfile.css";

function UpdateProfile({ history }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setavatar] = useState();
  const [avatarPreview, setavatarPreview] = useState();

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    let myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setavatarPreview(reader.result);
        setavatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (error) dispatch(clearErrors);
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setavatarPreview(user.avatar.url);
    }
    if (isUpdated) {
      dispatch(loadUser());
      history.push("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, isUpdated, history, loading, user, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h3 className="updateProfileHeading">Update Profile</h3>
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
                    onChange={(e) => setName(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div id="registerImage">
                  <img src={avatarPreview} alt="avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
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
      )}
    </Fragment>
  );
}

export default UpdateProfile;
