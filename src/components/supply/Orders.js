import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

export default function SupplyOrders({ history }) {

    const alert = useAlert();
    const { user } = useSelector(state => state.user)

    const [open, setOpen] = React.useState(false);
    const [selectOrder, setSelectOrder] = useState(null)
    const handleClickOpen = (order) => {
        setSelectOrder(order)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [orders, setAllOrders] = useState([])
    const [loading, setLoading] = useState(false)

    const getAllOrders = async () => {
        const res = await axios.get('https://walmart-backend.vercel.app/api/v1/supply/orders', { headers: { token: localStorage.getItem('token') } })
        console.log(res.data)
        if (res.data.success === true) {
            setAllOrders(res.data.supplies)

        }
        else {
            alert.error('Con not get Outgoing transections data')
        }


    }

    const handleSupply=async(id,val)=>{
        const res=await axios.put(`https://walmart-backend.vercel.app/api/v1/supply/order/${id}`,{supplied:val},{headers:{token:localStorage.getItem('token')}})

        if(res.data.success){
            getAllOrders()
        }
        else{
            alert.error("Can not update supply")
        }
    }

    useEffect(() => {
        getAllOrders()
    }, [])


    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Supply ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Invoice',
                    field: 'invoice',
                },

                {
                    label: 'Payment',
                    field: 'payment',
                },
                
                
                {
                    label: 'Supply',
                    field: 'supplied',
                },
            ],
            rows: []
        }

        orders.forEach(item => {
            let order = item.order;
            data.rows.push({
                id: order._id,
                payment: item.paymentInfo.id,
                invoice: <>
                    <span style={{ cursor: 'pointer' }} onClick={() => handleClickOpen(order)}>
                        <i class="fas fa-file-pdf" style={{ fontSize: '30px', textAlign: 'center', color: 'blue' }}></i>
                    </span>
                </>,
                supplied: order.supplied?<span style={{color:'green',fontWeight:'bold'}}>Supplied</span> :
                    <div>
                        <select name="supply" onChange={(e)=>handleSupply(order._id,e.target.value)}>
                            <option value={false}>Not Supplied</option>
                            <option value={true}>Supplied</option>
                        </select>
                    </div>,

            })
        })

        return data;
    }


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

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign: 'center' }}>Invoice</DialogTitle>
                <DialogContent sx={{ minWidth: '600px' }}>
                    <DialogContentText style={{ fontWeight: 'bold' }}>
                        Order: {selectOrder?._id}
                    </DialogContentText>
                    <table style={{ width: '100%', marginTop: '10px', marginBottom: '5px' }}>
                        <thead style={{ borderBottom: '1px solid gray' }}>
                            <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody style={{ width: '100%', borderBottom: '1px solid gray' }}>
                            {selectOrder && selectOrder.orderItems.map((item, id) => (
                                <tr key={id} style={{ width: '100%' }}>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>
                                        {item.quantity}
                                    </td>
                                    <td>
                                        BDT {item.price}
                                    </td>
                                    <td>
                                        BDT {item.quantity * item.price}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ width: '100%' }}>
                        <div >
                            <h6>Subtotal:  <span className="order-summary-values" style={{ marginBottom: '0px' }}>${selectOrder?.itemsPrice}</span></h6>
                            <h6>Shipping: <span className="order-summary-values">${selectOrder?.shippingPrice}</span></h6>
                            <h6>Tax:  <span className="order-summary-values">${selectOrder?.taxPrice}</span></h6>
                            <hr />
                            <h5>Total: <span className="order-summary-values">${selectOrder?.totalPrice}</span></h5>

                            <hr />

                        </div>
                    </div>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
