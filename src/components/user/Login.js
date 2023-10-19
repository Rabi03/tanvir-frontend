import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";

import { login, clearErrors } from "../../actions/UserActions";
import { Link } from "react-router-dom";

/**
 * A React component that renders a login form.
 *
 * @param {object} props The component props.
 * @param {string} props.history The history object.
 * @param {string} props.location The location object.
 *
 * @returns {React.Component} A React component that renders a login form.
 */
export default function Login({ history, location }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [Error, setError] = useState({});

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const redirect = location.search ? '/' + location.search.split("=")[1] : '/'
  console.log(redirect);

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }

    if (error) {
      setError(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthenticated, history, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Login"} />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={handleSubmit}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p style={{ marginTop: "5px", color: "red" }}>
                    {Error.email && Error.email}
                  </p>
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p style={{ marginTop: "5px", color: "red" }}>
                    {Error.password && Error.password}
                  </p>
                </div>

                <Link to="/password/forgot" className="float-right mb-4">
                  Forgot Password?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  LOGIN
                </button>

                <Link to="/register" className="float-right mt-3">
                  New User?
                </Link>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
