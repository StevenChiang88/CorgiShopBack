import * as React from "react";
import Dialog from "@mui/material/Dialog";

import { Box, Typography } from "@mui/material";

export default function AlertModal(props) {
  return (
    <Dialog open={props.modalShow}>
      <Box sx={{ padding: "1rem", width: "250px" }}>
        <Typography variant="h5">Confirm Action</Typography>
        <Typography mt="10px">Are you sure you want to do this?</Typography>
        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "1rem",
          }}
        >
          <button
            onClick={() => {
              props.setModalShow(false);
            }}
            style={{
              backgroundColor: "gray",
              color: "white",
              padding: "10px 30px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            No
          </button>
          <button
            onClick={() => {
              props.confirmHandler();
              props.setModalShow(false);
            }}
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px 30px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Yes
          </button>
        </div>
      </Box>
    </Dialog>
  );
}
