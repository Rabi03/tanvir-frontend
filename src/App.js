import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { loadedUser } from "./actions/UserActions";
import "./App.css";
import Cart from "./components/cart/Cart";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ProductDetails from "./components/product/ProductDetails";
import PrivateRoute from "./components/route/PrivateRoute";
import ForgotPassword from "./components/user/ForgotPassword";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import Register from "./components/user/Register";
import ResetPassword from "./components/user/ResetPassword";
import UpdatePassword from "./components/user/UpdatePassword";
import UpdateProfile from "./components/user/UpdateProfile";
import Shipping from "./components/cart/Shipping";
import store from "./Store";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import axios from "axios";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOfOrders from "./components/order/ListOfOrders";
import OrderDetails from "./components/order/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import Products from "./components/admin/Products";
import NewProduct from "./components/admin/NewProduct";
import { useDispatch, useSelector } from "react-redux";
import UpdateProduct from "./components/admin/UpdateProduct";
import Orders from "./components/admin/Orders";
import ProcessOrder from "./components/admin/ProcessOrder";
import Users from "./components/admin/Users";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";
import Transactions from "./components/admin/Transactions";
import SupplyDashboard from "./components/supply/Dashboard";
import SupplyTransactions from "./components/supply/Transactions";
import SupplyOrders from "./components/supply/Orders";
import OrderCancel from "./components/cart/OrderCancel";
import OrderFail from "./components/cart/OrderFail";
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { BsMessenger } from 'react-icons/bs'
import Dialog from '@mui/material/Dialog';
import {BiMessageDetail} from "react-icons/bi"
import Home2 from "./components/Home2";

//"http://[::1]:5000"

export default function App() {
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");
  const { user, isAuthenticated, loading } = useSelector(state => state.user)
  const [open,setOpen]=useState(false)


  return (
    <Router>
      <div>
        <Header />
        <div className="container container-fluid">
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/me/update" exact component={UpdateProfile} />
          <Route path="/password/update" exact component={UpdatePassword} />
          <Route path="/password/forgot" exact component={ForgotPassword} />
          <Route
            path="/password/reset/:token"
            exact
            component={ResetPassword}
          />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" exact component={ProductDetails} />

          <Route path="/payment" component={Payment} />

          <Route path="/shipping" exact component={Shipping} />
          <Route path="/confirm" exact component={ConfirmOrder} />
          <Route path="/orders/me" exact component={ListOfOrders} />
          <PrivateRoute path="/order/:id" exact component={OrderDetails} />
          <PrivateRoute path="/me" exact component={Profile} />
          <PrivateRoute path="/success" exact component={OrderSuccess} />
          <PrivateRoute path="/fail" exact component={OrderFail} />
          <PrivateRoute path="/cancel" exact component={OrderCancel} />

        </div>

        <PrivateRoute path="/dashboard" isAdmin={true} exact component={Dashboard} />
        <PrivateRoute path="/admin/products" isAdmin={true} exact component={Products} />
        <PrivateRoute path="/admin/transactions" isAdmin={true} exact component={Transactions} />
        <PrivateRoute path="/admin/orders" isAdmin={true} exact component={Orders} />
        <PrivateRoute path="/admin/users" isAdmin={true} exact component={Users} />
        <PrivateRoute path="/admin/reviews" isAdmin={true} exact component={ProductReviews} />
        <PrivateRoute path="/admin/order/:id" isAdmin={true} exact component={ProcessOrder} />
        <PrivateRoute path="/admin/user/:id" isAdmin={true} exact component={UpdateUser} />
        <PrivateRoute path="/admin/product/new" isAdmin={true} exact component={NewProduct} />
        <PrivateRoute path="/admin/products/:id" isAdmin={true} exact component={UpdateProduct} />
        <PrivateRoute path="/supply/dashboard" isSupply={true} exact component={SupplyDashboard} />
        <PrivateRoute path="/supply/transactions" isSupply={true} exact component={SupplyTransactions} />
        <PrivateRoute path="/supply/orders" isSupply={true} exact component={SupplyOrders} />

        {!loading && (!isAuthenticated || user.role !== 'admin' || user.role !== 'supply') && (
          <Footer />
        )}
        <Dialog open={open} onClose={()=>setOpen(!open)}>
          <div className="container my-5" >
            <div className="row justify-content-center">
              <div className="col-lg-9">
                <h1 className="mb-3">Contact Us</h1>
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label for="your-name" className="form-label">Your Name</label>
                      <input type="text" className="form-control" id="your-name" name="your-name" required />
                    </div>
                    <div className="col-md-6">
                      <label for="your-surname" className="form-label">Your Surname</label>
                      <input type="text" className="form-control" id="your-surname" name="your-surname" required />
                    </div>
                    <div className="col-md-6">
                      <label for="your-email" className="form-label">Your Email</label>
                      <input type="email" className="form-control" id="your-email" name="your-email" required />
                    </div>
                    <div className="col-md-6">
                      <label for="your-subject" className="form-label">Your Subject</label>
                      <input type="text" className="form-control" id="your-subject" name="your-subject" />
                    </div>
                    <div className="col-12">
                      <label for="your-message" className="form-label">Your Message</label>
                      <textarea className="form-control" id="your-message" name="your-message" rows="5" required></textarea>
                    </div>
                    <div className="col-12 ">
                      <div className="row">
                        <div className="col-md-12" >
                          <button  type="submit" className="btn btn-dark w-100 fw-bold" style={{marginTop:'10px'}} >Send</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Dialog>

        <Fab
          mainButtonStyles={{ backgroundColor: 'red' }}
          // actionButtonStyles={actionButtonStyles}
          // style={style}
          icon={<BiMessageDetail size={30} />}
          event={"click"}
          alwaysShowTitle={true}
        onClick={()=>setOpen(!open)}
        >

          

        </Fab>
      </div>
    </Router>
  );
}
