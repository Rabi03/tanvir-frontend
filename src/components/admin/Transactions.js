import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import { useState } from 'react';
import { useAlert } from 'react-alert'
import { useEffect } from 'react';
import { allOrders } from '../../actions/OrderActions';

/**
 * The `Transactions` component renders a list of all transactions, including both incoming and outgoing transactions.
 *
 * The component uses the `allOrders` reducer to get a list of all orders. Each order has a `paymentInfo` property, which contains information about the payment for the order.
 *
 * The component also uses the `useAlert` hook to display alerts to the user.
 *
 * @returns {React.Component} A React component that renders a list of all transactions.
 */
export default function Transactions() {
    const dispatch=useDispatch()
    const alert = useAlert();
    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { user } = useSelector(state => state.user)
    const [outGoing, setOutGoing] = useState([])
    const [outLoading, setOutLoading] = useState(false)
    const [selectOrder, setSelectOrder] = useState(null)
    const [password, setPassword] = useState('');

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (order) => {
        setSelectOrder(order)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getOutGoingTransactions = async () => {
        try {
            setOutLoading(false)
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios.get(`http://localhost:5001/api/account/web/${user?.account}`, config)

            if (res.data) {
                setOutGoing(res.data.out)

            }
            else {
                alert.error('Con not get Outgoing transections data')
            }
        } catch (error) {
            alert.error(error)
        }

    }

    useEffect(() => {
        getOutGoingTransactions()
    }, [])


    

    const transferBalance = async (e) => {
        e.preventDefault();

        const token=localStorage.getItem('token')

        let res;
        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            //Supplier account
            res = await axios.put(`http://localhost:5001/api/account/web/transfer/${user?.account}/202511545302`, {
                balanceTransfered: Number(selectOrder?.totalPrice),
                oldPassword: password,
                from: user?.account,
                to: 202511545303,
            }, config)




            if (!res.data) {
                console.log(error)
                alert.error(res.error.message);
                
            } else {

                console.log(res.data)
                if (res.data) {
                    let recived=res.data.in[res.data.in.length-1]
                    let paymentInfo = {
                        balance_transfered:recived.balance_transfered,
                        createdAt:new Date(recived.createdAt),
                        from:recived.from,
                        id:recived._id
                    }

                    let result = await axios.post(`https://walmart-backend.vercel.app/api/v1/admin/supply`, {
                        order:selectOrder?._id,
                        paymentInfo
                    }, {
                        headers:{token}
                    })

                    if(result.data&&result.data.success===true){
                        dispatch(allOrders())
                        getOutGoingTransactions()
                        setOpen(false)
                    }
                    else{
                        alert.error('can not transfer order to supplier')
                    }

                    
                } else {
                    alert.error('There is some issue while payment processing')
                }
            }


        } catch (error) {
            console.log(error)
            document.querySelector('#pay_btn').disabled = false;
            alert.error( error.response.data.message)
        }
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
                        <h1 className="my-5">All Transactions</h1>
                        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '80%', margin: '0px auto', flexDirection: 'row', width: '100%', }}>
                            <div style={{ border: '1px solid gray', borderRadius: '10px', padding: '10px', width: '50%', marginRight: '20px' }}>
                                <h3>Incoming Transactions</h3>

                                {loading ? <Loader /> : (
                                    <List sx={{ bgcolor: 'background.paper', width: '100%' }}>

                                        {orders.length > 0 ? orders?.map(order =>
                                            <ListItem key={order._id} sx={{ alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', }}>
                                                <ListItemAvatar sx={{ marginTop: '5px' }}>
                                                    <Avatar style={{ backgroundColor: 'white', border: "2px solid green" }}>
                                                        <KeyboardDoubleArrowUpIcon color='success' />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={<span style={{ fontWeight: 'bold' }}>{order.paymentInfo?.id}</span>} secondary={<span>
                                                    Account Number: {order.paymentInfo?.from}<br />
                                                    {new Date(order.paymentInfo?.createdAt).toDateString()}<br /><br />
                                                    {!order.transfered &&
                                                        <span style={{ padding: '15px', backgroundColor: 'blue', top: '10px', color: 'white', fontSize: '13px', fontWeight: 'bold', borderRadius: '7px', cursor: 'pointer' }} onClick={() => handleClickOpen(order)}>
                                                            Transfer payment and Order
                                                        </span>
                                                    }
                                                </span>} />
                                                <ListItemText sx={{ textAlign: 'end' }} primary={<span style={{ color: 'green', fontWeight: 'bold' }}>+ BDT {order.paymentInfo?.balance_transfered}</span>} />
                                            </ListItem>

                                        )
                                            :
                                            <p>No Transaction found</p>
                                        }

                                    </List>

                                )}

                            </div>
                            <div style={{ border: '1px solid gray', borderRadius: '10px', padding: '10px', width: '50%' }}>
                                <h3>Outgoing Transactions</h3>

                                {outLoading ? <Loader /> : (
                                    outGoing.length > 0 ?
                                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                            {outGoing.map(pay =>
                                                <ListItem key={pay._id} sx={{ alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', }}>
                                                    <ListItemAvatar sx={{ marginTop: '5px' }}>
                                                        <Avatar style={{ backgroundColor: 'white', border: "2px solid red" }}>
                                                            <KeyboardDoubleArrowDownIcon color='error' />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={<span style={{ fontWeight: 'bold' }}>{pay._id}</span>} secondary={<span>
                                                        Account Number: {pay.to} <br />
                                                        {new Date(pay.createdAt).toDateString()}
                                                    </span>} />
                                                    <ListItemText sx={{ textAlign: 'end' }} primary={<span style={{ color: 'red', fontWeight: 'bold' }}>- BDT {pay.balance_transfered}</span>} />
                                                </ListItem>
                                            )}

                                        </List>


                                        :
                                        <p>No Transaction found</p>
                                )}


                            </div>

                        </div>


                    </>
                </div>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign: 'center' }}>Invoice</DialogTitle>
                <DialogContent sx={{ minWidth: '600px' }}>
                    <DialogContentText style={{fontWeight:'bold'}}>
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

                    <div className="form-group">
                        <label htmlFor="email_field">Your Account password</label>
                        <input
                            type="text"
                            id="email_field"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={transferBalance}>Transfer</Button>
                </DialogActions>
            </Dialog>

        </>

    );
}