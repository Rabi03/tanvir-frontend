/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";

import { register, clearErrors } from "../../actions/UserActions";

/**
 * A React component that renders a registration form.
 *
 * @param {object} props The component props.
 * @param {string} props.history The history object.
 *
 * @returns {React.Component} A React component that renders a registration form.
 */
export default function Register({ history }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const { name, email, password, role } = userData;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );
  const dispatch = useDispatch();
  const [Error, setError] = useState({});

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error) {
      setError(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthenticated, history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(register(name, email, password, avatar,role));
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
      <MetaData title={"Register"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-3">Register</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                value={name}
                name="name"
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <p style={{ marginTop: "5px", color: "red" }}>
                {Error.name && Error.name}
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                name="email"
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <p style={{ marginTop: "5px", color: "red" }}>
                {Error.email && Error.email}
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="email_field">Role</label>
              <select name="role" className="form-select form-control" aria-label="Default select example" value={role} onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }>
                
                <option value="user">user</option>
                <option value="seller">seller</option>
              </select>
              
            </div>


            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                name="password"
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <p style={{ marginTop: "5px", color: "red" }}>
                {Error.account && Error.account}
              </p>
            </div>


            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="image"
                    />
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
                  <p style={{ marginTop: "5px", color: "red" }}>
                    {Error.avatar && Error.avatar}
                  </p>
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
