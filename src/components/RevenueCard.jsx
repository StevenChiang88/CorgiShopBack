import { Box, Typography } from "@mui/material";
import React from "react";

const RevenueCard = ({ title, profit, percent, grass }) => {
  let grassColor;
  if (grass > 0) {
    grassColor = "#ff744f";
  } else {
    grassColor = "#95bb72";
  }
  grass &&
    (grass > 0
      ? (grass = `+ ${grass.toLocaleString()} (${(percent * 100).toFixed(
          2
        )})% `)
      : (grass = ` ${grass.toLocaleString()} (${(percent * 100).toFixed(
          2
        )})% `));

  return (
    <Box
      sx={{
        padding: "1rem",
        flex: "1",
        height: "100px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h5">{title}</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>$ {profit.toLocaleString()}</Typography>
        <Typography color={grassColor}>{percent ? grass : "---"}</Typography>
      </Box>
    </Box>
  );
};
// + 4,389 (37.84%)
export default RevenueCard;
