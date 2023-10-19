import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

/**
 * A React component that renders a user's profile.
 *
 * @returns {React.Component} A React component that renders a user's profile.
 */
export default function Profile() {
  const { user, loading } = useSelector((state) => state.user);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Your Profile"} />

          <h2 className="mt-5 ml-5">My Profile</h2>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <figure className="avatar avatar-profile">
                <img
                  className="rounded-circle img-fluid"
                  src={user.avatar.url}
                  alt={user.name}
                />
              </figure>
            </div>

            <div className="col-12 col-md-8">
              <h4>Full Name</h4>
              <p>{user.name}</p>

              <h4>Email Address</h4>
              <p>{user.email}</p>
              <h4>Bank Account No</h4>
              <p>{user.account}</p>

              <h4>Joined On</h4>
              <p>{String(user.createdAt).substring(0, 10)}</p>

              <div className='row'>
                {user.role !== "admin" && (
                  <Link
                    to="/orders/me"
                    className="btn btn-danger btn-block mt-3 col-4 col-md-3"
                  >
                    My Orders
                  </Link>
                )}

                <Link
                  to="/password/update"
                  className="btn btn-primary  mt-3 col-4 col-md-3"
                  style={{marginLeft:5,marginRight:5}}
                >
                  Change Password
                </Link>
                <Link
                  to="/me/update"
                  id="edit_profile"
                  className="btn btn-primary  mt-3 col-4 col-md-3"
                  
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
