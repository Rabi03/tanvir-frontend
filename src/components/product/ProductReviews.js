import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
/**
 * A React component that displays a list of product reviews.
 *
 * @param {object} props The component props.
 * @param {array} props.reviews An array of product reviews.
 *
 * @returns {React.Component} A React component that displays a list of product reviews.
 */
export default function ProductReviews({reviews}) {
  return (
      <>
      <h3>Product Reviews</h3>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    {reviews.map((review,index) => (
        <>
        <ListItem key={index} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={review.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={review.name}
          secondary={
            <>
              <Typography
                component="p"
                variant="body2"
                color="text.primary"
              >
                 <Rating name="read-only" value={review.rating} readOnly />
              </Typography>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {review.comment}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
        </>
    ))}
      
    </List>
    </>
  );
}

