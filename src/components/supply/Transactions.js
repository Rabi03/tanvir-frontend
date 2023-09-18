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
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useState } from 'react';
import { useAlert } from 'react-alert'
import { useEffect } from 'react';
import { allOrders } from '../../actions/OrderActions';


export default function SupplyTransactions() {
    const dispatch = useDispatch()
    const alert = useAlert();
    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { user } = useSelector(state => state.user)
    const [inComing, setInComing] = useState([])
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

    const getInComingTransactions = async () => {
        try {
            setOutLoading(false)
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios.get(`http://localhost:5001/api/account/web/${user?.account}`, config)

            if (res.data) {
                setInComing(res.data.in)

            }
            else {
                alert.error('Con not get Outgoing transections data')
            }
        } catch (error) {
            alert.error(error)
        }

    }

    useEffect(() => {
        getInComingTransactions()
    }, [])



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
                        <div style={{ margin: 'Opx auto', maxWidth: '80%', margin: '0px auto', flexDirection: 'row', width: '100%', }}>
                            <div style={{ border: '1px solid gray', borderRadius: '10px', padding: '10px', width: '50%', marginRight: '20px' }}>
                                <h3>Incoming Transactions</h3>

                                {loading ? <Loader /> : (
                                    <List sx={{ bgcolor: 'background.paper', width: '100%' }}>

                                        {outLoading ? <Loader /> : (
                                            inComing.length > 0 ?
                                                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                                    {inComing.map(pay =>
                                                        <ListItem key={pay._id} sx={{ alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', }}>
                                                            <ListItemAvatar sx={{ marginTop: '5px' }}>
                                                                <Avatar style={{ backgroundColor: 'white', border: "2px solid green" }}>
                                                                    <KeyboardDoubleArrowUpIcon color='success' />
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText primary={<span style={{ fontWeight: 'bold' }}>{pay._id}</span>} secondary={<span>
                                                                Account Number: {pay.from} <br />
                                                                {new Date(pay.createdAt).toDateString()}
                                                            </span>} />
                                                            <ListItemText sx={{ textAlign: 'end' }} primary={<span style={{ color: 'green', fontWeight: 'bold' }}>+ BDT {pay.balance_transfered}</span>} />
                                                        </ListItem>
                                                    )}

                                                </List>


                                                :
                                                <p>No Transaction found</p>
                                        )}
                                    </List>

                                )}

                            </div>


                        </div>


                    </>
                </div>
            </div>


        </>

    );
}