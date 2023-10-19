import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { MDBDataTable } from "mdbreact";

import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearErrors } from "../../actions/OrderActions";
import Loader from "../layout/Loader";
/**
 * React component for displaying a list of user's orders.
 * @returns {React.Component} A React component that displays a list of user's orders.
 */
export default function ListOfOrders() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  /**
     * Use the useEffect hook to fetch the user's orders and handle errors.
     */
  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      alert.error(error.message);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

   /**
   * Generate data for the MDBDataTable component.
   * @returns {object} - Data for the MDBDataTable component.
   */
  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
            String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <>
      <MetaData title={"My Orders"} />
      <h1 className="my-5">My Orders</h1>
      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setOrders()}
          className="px-3"
          bordered
          striped
          hover
        />
      )}
    </>
  );
}
