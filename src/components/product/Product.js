import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

/**
 * A React component that displays a product card.
 *
 * @param {object} props The component props.
 * @param {object} props.product The product to display.
 * @param {number} props.col The number of columns that the product card should occupy.
 *
 * @returns {React.Component} A React component that displays a product card.
 */
export default function Product({ product, col }) {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <Card sx={{ maxWidth: 345,height:'300px'}}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={product.images[0]&&product.images[0].url}
          style={{ objectFit: "cover" }}
        />
        <CardContent>
          <h6 className="card-title">
            <Link to={`/product/${product._id}`}>{product.name.substring(0,40)} ...</Link>
          </h6>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.rating / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numberOfReviews} Reviews)</span>
          </div>
        </CardContent>
        <CardActions>
          <Button className="col-sm-4" style={{ color: "black" }} disabled>
            ${product.price}
          </Button>
          <div className="col-sm-2"></div>
          <Button className="col-sm-6" href={`/product/${product._id}`} style={{textTransform: 'capitalize',fontSize:'15px',fontWight:'bold'}}>
            View Details
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
