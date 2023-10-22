import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allOrders, deleteOrder, clearErrors } from '../../actions/OrderActions'
import { DELETE_ORDER_RESET } from '../../constants/OrderConstants'

/**
 * A React component that renders a list of all orders.
 *
 * @returns {React.Component} A React component that renders a list of all orders.
 */
export default function Orders({ history }) {

    /**
   * The useAlert hook to display alerts to the user.
   */
    const alert = useAlert();

    /**
     * The useDispatch hook to dispatch actions to the Redux store.
     */
    const dispatch = useDispatch();

    /**
     * The useSelector hook to select state from the Redux store.
     */
    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { isDeleted } = useSelector(state => state.orderDelorUp)

    /**
     * An effect hook that fetches all orders from the Redux store and displays an alert
     * if there is an error.
     */
    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Order deleted successfully');
            history.push('/admin/orders');
            dispatch({ type: DELETE_ORDER_RESET })
        }

    }, [dispatch, alert, error, history, isDeleted])

    /**
     * A function that dispatches an action to delete an order.
     *
     * @param {string} id The ID of the order to delete.
     */
    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    /**
     * A function that formats the orders data for the MDBDataTable component.
     *
     * @returns {object} An object containing the formatted orders data.
     */
    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'No of Items',
                    field: 'numofItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },

                {
                    label: 'Payment',
                    field: 'payment',
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                // {
                //     label: 'Supply',
                //     field: 'supplied',
                // },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numofItems: order.orderItems.length,
                amount: `BDT ${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                payment: order.paymentInfo?order.paymentInfo.payment_status:"",
                //     supplied:order.supplied&&String(order.orderStatus).includes('Delivered')?<div className='line'>
                //     <h6 className='pop-outin'>supplied</h6>
                //   </div>:<p style={{ color: 'green' }}></p>,
                actions: <>
                    <Link to={`/admin/order/${order._id}`}>
                        <i className="fa fa-eye"></i>
                    </Link>
                    <i className="fa fa-trash" style={{ marginLeft: 20, color: 'red', cursor: 'pointer' }} onClick={() => deleteOrderHandler(order._id)}></i>
                </>
            })
        })

        return data;
    }

    /**
   * Renders the list of all orders.
   *
   * @returns {React.Component} A React component that renders the list of all orders.
   */
    return (
        <>
            <MetaData title={'All Orders'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <>
                        <h1 className="my-5">All Orders</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setOrders()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </>
                </div>
            </div>

        </>
    )
}
