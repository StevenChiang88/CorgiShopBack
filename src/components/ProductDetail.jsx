import React from "react";
import {
  Box,
  Dialog,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Paper,
} from "@mui/material";
import { GeneralButton } from "../styles/styledcomponents";

const ProductDetail = ({ setProductDetailOpen, singleProductData }) => {
  return (
    <Dialog
      open={true}
      onClose={() => {
        setProductDetailOpen(false);
      }}
    >
      <Box
        sx={{
          padding: "2rem",
        }}
      >
        <Table aria-label="simple table" sx={{ minWidth: "500px" }}>
          <TableHead>
            <TableRow>
              <TableCell>商品名稱</TableCell>
              <TableCell align="left">商品ID</TableCell>
              <TableCell align="left">單價</TableCell>
              <TableCell align="left">數量</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {singleProductData.map((item) => (
              <TableRow
                key={item.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.title}
                </TableCell>

                <TableCell align="left">{item.productId}</TableCell>
                <TableCell align="left">{item.price}</TableCell>
                <TableCell align="left">{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <GeneralButton
          sx={{ marginTop: "1rem" }}
          onClick={() => {
            setProductDetailOpen(false);
          }}
        >
          關閉詳情
        </GeneralButton>
      </Box>
    </Dialog>
  );
};

export default ProductDetail;
