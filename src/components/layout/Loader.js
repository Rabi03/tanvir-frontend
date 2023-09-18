import React from "react";
import MetaData from "./MetaData";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader() {
  return (
    <>
      <MetaData title={"Loading... "} />
      <Box sx={{ display: "flex" }}>
        <CircularProgress className='loader' size={80} />
      </Box>
    </>
  );
}
