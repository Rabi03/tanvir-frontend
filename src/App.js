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
import { BiMessageDetail } from "react-icons/bi"
import ChatHome from "./components/ChatHome";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./components/firebase";
import SellerProduct from './components/supply/Products'
import SellerNewProduct from './components/supply/NewProduct'
import SellerUpdateProduct from './components/supply/UpdateProduct'
import { useContext } from "react";
import { ChatContext } from "./components/context/ChatContext";
import ReturnRefund from "./components/ReturnRefund";
import FreqQuestion from "./components/FreqQuestion";

//"http://[::1]:5000"

export default function App() {
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");
  const { user, isAuthenticated, loading } = useSelector(state => state.user)
  const {open, setOpen} = useContext(ChatContext)

  useEffect(() => {

    const setChat = async () => {
      if (user) {
        const res = await getDoc(doc(db, "userChats", user?._id));

        if (!res.exists()) {
          //create a chat in userChats collection
          await setDoc(doc(db, "userChats", user._id), {});
        }
      }
    }

    setChat()
  }, [user])


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
          <Route path="/return&refund" exact component={ReturnRefund} />
          <Route path="/password/update" exact component={UpdatePassword} />
          <Route path="/password/forgot" exact component={ForgotPassword} />
          <Route
            path="/password/reset/:token"
            exact
            component={ResetPassword}
          />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/category/:category" component={Home} />
          <Route path="/product/:id" exact component={ProductDetails} />

          <Route path="/payment" component={Payment} />

          <Route path="/shipping" exact component={Shipping} />
          <Route path="/confirm" exact component={ConfirmOrder} />
          <Route path="/orders/me" exact component={ListOfOrders} />
          <PrivateRoute path="/order/:id" exact component={OrderDetails} />
          <PrivateRoute path="/me" exact component={Profile} />
          <PrivateRoute path="/frequs" exact component={FreqQuestion} />
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
        <PrivateRoute path="/seller/dashboard" isSupply={true} exact component={SupplyDashboard} />
        <PrivateRoute path="/seller/transactions" isSupply={true} exact component={SupplyTransactions} />
        <PrivateRoute path="/seller/orders" isSupply={true} exact component={SupplyOrders} />
        <PrivateRoute path="/seller/products"  isSupply={true} exact component={SellerProduct} />
        <PrivateRoute path="/seller/product/new"  isSupply={true} exact component={SellerNewProduct} />
        <PrivateRoute path="/seller/products/:id"  isSupply={true} exact component={SellerUpdateProduct} />

        {!loading && (!isAuthenticated || user.role !== 'admin' || user.role !== 'seller') && (
          <Footer />
        )}
        <Dialog
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              
              maxHeight: 600,
              borderRadius:2
            }
          }}
          open={open} onClose={() => setOpen(!open)}>
          <ChatHome />
        </Dialog>

        <Fab
          mainButtonStyles={{ backgroundColor: 'red' }}
          // actionButtonStyles={actionButtonStyles}
          // style={style}
          icon={<BiMessageDetail size={30} />}
          event={"click"}
          alwaysShowTitle={true}
          onClick={() => setOpen(!open)}
        >



        </Fab>
      </div>
    </Router>
  );
}
