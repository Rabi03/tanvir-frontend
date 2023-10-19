import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";

import {
  updateProfile,
  loadedUser,
  clearErrors,
} from "../../actions/UserActions";
import { UPDATE_PROFILE_RESET } from "../../constants/UserConstants";

/**
 * A React component that renders a profile update form.
 *
 * @param {object} props The component props.
 * @param {string} props.history The history object.
 *
 * @returns {React.Component} A React component that renders a profile update form.
 */
export default function UpdateProfile({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.jpg");

  const alert = useAlert();
  const dispatch = useDispatch();
  const [Error, setError] = useState({});

  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (isUpdated) {
      alert.success("Profile Updated successfully");
      dispatch(loadedUser());
      history.push("/me");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
    if (error) {
      setError(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, isUpdated, history, alert,user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProfile(name, email, avatar));
  };

  const UploadFile = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        setAvatarPreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <MetaData title={"Update Profile"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={e=>setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img src={avatarPreview} className="rounded-circle" alt="Avatar Preview" />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={UploadFile}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false}>
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
