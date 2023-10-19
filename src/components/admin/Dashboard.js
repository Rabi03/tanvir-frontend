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
import { getAdminProducts } from '../../actions/ProductActions'
import { allOrders } from "../../actions/OrderActions";

/**
 * A React component that renders the admin dashboard.
 *
 * @returns {React.Component} A React component that renders the admin dashboard.
 */
const Dashboard = () => {
  const dispatch = useDispatch();

    const { products } = useSelector(state => state.products);
    const {orders,totalAmount,loading } = useSelector(state => state.allOrders);
    const {users} = useSelector(state => state.allUsers);
    let OutOfStock=0;
    products.forEach(product =>{
      if(product.stock===0) OutOfStock+=1;
    })
    useEffect(() => {
      dispatch(getAdminProducts());
      dispatch(allOrders())
  }, [dispatch])
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
                    Total Price
                  </Typography>
                  <Typography className='card-font-size' variant="body2" style={{color:'white',fontWeight:'bold',fontSize:'24px'}}>
                    ${totalAmount}
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <div className="col-xl-4 col-sm-6 mb-3">
            <Card sx={{ maxWidth: 345,backgroundColor:'#17a2b8' }}>
                <CardContent>
                  <Typography className='card-font-size' gutterBottom variant="h5" component="div" style={{color:'white'}}>
                    Products
                  </Typography>
                  <Typography className='card-font-size' variant="body2" style={{color:'white',fontWeight:'bold',fontSize:'24px'}}>
                    {products&&products.length}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to="/admin/products"  style={{color:'white',textTransform:'capitalize'}}>View Details</Link>
                </CardActions>
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
            <div className="col-xl-4 col-sm-6 mb-3">
            <Card sx={{ maxWidth: 345,backgroundColor:'#28a745' }}>
                <CardContent>
                  <Typography className='card-font-size' gutterBottom variant="h5" component="div" style={{color:'white'}}>
                    Users
                  </Typography>
                  <Typography className='card-font-size' variant="body2" style={{color:'white',fontWeight:'bold',fontSize:'24px'}}>
                    {users&&users.length}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to="/admin/users" style={{color:'white',textTransform:'capitalize'}}>View Details</Link>
                </CardActions>
              </Card>
            </div>
            <div className="col-xl-4 col-sm-6 mb-3">
            <Card sx={{ maxWidth: 345,backgroundColor:'#ffc107' }}>
                <CardContent>
                  <Typography className='card-font-size' gutterBottom variant="h5" component="div" style={{color:'white'}}>
                    Out Of Stock
                  </Typography>
                  <Typography className='card-font-size' variant="body2" style={{color:'white',fontWeight:'bold',fontSize:'24px'}}>
                    {OutOfStock}
                  </Typography>
                </CardContent>
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

export default Dashboard;
