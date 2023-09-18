import React, {useEffect } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useState } from "react";
import { useAlert } from 'react-alert'

const SupplyDashboard = () => {
  const alert = useAlert();
  const {user}=useSelector(state=>state.user)

    const [loading,setLoading]=useState(false)
    const [account,setAccount]=useState(null)
    const [orders,setOrders]=useState([])
    
    const getAccount=async()=>{
      setLoading(true)
      const res=await axios.get(`http://localhost:5001/api/account/web/${user?.account}`)
      if (res.data) {
        setAccount(res.data)

    }
    else {
        alert.error('Con not get Outgoing transections data')
    }

    setLoading(false)
    }

    const  getAllOrders=async()=>{
      const res=await axios.get('https://tanvir-backend.vercel.app/api/v1/supply/orders',{headers:{token:localStorage.getItem('token')}})
      console.log(res.data)
      if (res.data.success===true) {
        setOrders(res.data.supplies)

    }
    else {
        alert.error('Con not get Outgoing transections data')
    }

      
    }
    
    useEffect(() => {
      getAccount()
      getAllOrders()
  }, [])
  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">Dashboard</h1>
          {loading?<Loader />:
          <>
            <MetaData title={'Admin Dashboard'} />
            <div className="row pr-4">
          <div className="col-xl-4 col-sm-6 mb-3">
            <Card sx={{ maxWidth: 345,backgroundColor:'#007bff' }}>
                <CardContent>
                  <Typography className='card-font-size' gutterBottom variant="h5" component="div" style={{color:'white'}}>
                    Account Balance
                  </Typography>
                  <Typography className='card-font-size' variant="body2" style={{color:'white',fontWeight:'bold',fontSize:'24px'}}>
                    ${account?.balance}
                  </Typography>
                </CardContent>
              </Card>
            </div>
            
            <div className="col-xl-4 col-sm-6 mb-3">
            <Card sx={{ maxWidth: 345,backgroundColor:'#dc3545' }}>
                <CardContent>
                  <Typography className='card-font-size' gutterBottom variant="h5" component="div" style={{color:'white'}}>
                    Orders
                  </Typography>
                  <Typography className='card-font-size' variant="body2" style={{color:'white',fontWeight:'bold',fontSize:'24px'}}>
                    {orders&&orders.length}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to="/admin/orders" style={{color:'white',textTransform:'capitalize'}}>View Details</Link>
                </CardActions>
              </Card>
            </div>
            
            </div>
          </>
          }
        </div>
      </div>
    </>
  );
};

export default SupplyDashboard;
