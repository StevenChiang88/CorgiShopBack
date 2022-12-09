import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";

export const GeneralButton = styled(Button)({
  color: "white",
  backgroundColor: "#42BBFA",
  border: "1px solid #42BBFA",
  borderRadius: 0,
  padding: "5px 20px",
  ":hover": {
    border: "1px solid #42BBFA",
    backgroundColor: "white",
    color: "#42BBFA",
  },
});

export const GeneralBox = styled(Box)({
  minHeight: "calc(100vh - 4rem)",
  backgroundColor: "#F0F0F0",
  display: "flex",
  flexDirection: "column",
  width: "100vw",
});

export const DataBox = styled(Box)({
  minHeight: "calc(100vh - 10rem)",
  backgroundColor: "#F0F0F0",
  margin: "2rem",
  display: "flex",
  flexDirection: "column",
});
