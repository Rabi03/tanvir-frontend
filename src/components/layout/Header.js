import React, { useContext, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout, loadedUser } from "../../actions/UserActions";
import Badge from "@mui/material/Badge";
import { createTheme } from '@mui/material/styles';
import jwtDecode from "jwt-decode";
import { ChatContext } from "../context/ChatContext";


/**
 * A React component that displays the header of the website.
 *
 * @returns {React.Component} A React component that displays the header of the website.
 */
export default function Header() {
  /**
   * The Redux dispatch function.
   *
   * @type {function}
   */
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user, loading } = useSelector((state) => state.user);
  const { dispatch: ChatDispatch } = useContext(ChatContext)
  /**
  * The cart items state.
  *
  * @type {Array}
  */
  const { cartItems } = useSelector((state) => state.cart)

  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token")
        localStorage.removeItem("cartItems")
      } else {

        dispatch(loadedUser())
      }
    }

  }, [dispatch])

  const handleLogOut = () => {
    dispatch(logout());
    ChatDispatch({ type: "CHANGE_USER", payload: null })
    alert.success("Log Out Successfully.....");
  };

  return (
    <div style={{ width: '100%', backgroundColor: '#212529' }}>

      <nav className="navbar row container container-fluid mx-auto rounded" style={{ backgroundColor: '#212529' }}>

        <div className="col-12 col-md-2">
          <div className="navbar-brand">
            <Link to="/">
              <img src="/images/walmart-logo.png" alt="" width="120" height="50" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Route render={({ history }) => <Search history={history} />} />
        </div>

        <div className="col-12 col-md-4 mt-4 mt-md-0 text-center" style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <Badge badgeContent={cartItems.length} color="secondary">
              <i className="fas fa-shopping-cart" style={{ color: "white", fontSize: "22px" }}></i>
            </Badge>
          </Link>
          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user?.role === "admin" && (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                )}
                {user && user?.role === "seller" && (
                  <Link className="dropdown-item" to="/seller/dashboard">
                    Seller
                  </Link>
                )}
                <Link className="dropdown-item" to="/orders/me">
                  Orders
                </Link>
                <Link className="dropdown-item" to="/me">
                  Profile
                </Link>
                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={handleLogOut}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}
          <div  style={{ backgroundColor: '#212529', color: 'white', padding: '0px', margin:'0px' }}>

            <div className="dropdown">
              <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ background: 'transparent', color: 'white', border: 'none',  fontSize: '10px',marginRight:'20px' }}>
                Help and support
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="/return&refund">Returns & Refunds</a>

              </div>
            </div>
          </div>

        </div>

      </nav>
    </div>
  );
}
