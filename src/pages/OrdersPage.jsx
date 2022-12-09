import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ProductDetail from "../components/ProductDetail";
import { useGetOrdersQuery } from "../store/orderApi";
import { DataBox, GeneralButton } from "../styles/styledcomponents";

const OrdersPage = () => {
  const { data: ordersData, isSuccess } = useGetOrdersQuery();
  const [productDetailOpen, setProductDetailOpen] = useState(false);
  const [singleProductData, setSingleProductData] = useState();
  const [convertData, setConvertData] = useState();
  const columns = [
    { field: "orderId", headerName: "訂單編號", width: 250 },
    { field: "createdAt", headerName: "訂單日期", width: 120 },
    { field: "consignee", headerName: "訂購人", width: 100 },
    { field: "phone", headerName: "手機", width: 130 },
    { field: "address", headerName: "地址", width: 250 },

    {
      field: "products",
      headerName: "購買商品",
      sortable: false,
      width: 130,
      renderCell: (row) => {
        return (
          <GeneralButton
            onClick={() => {
              setSingleProductData(row.row.products);
              setProductDetailOpen(true);
            }}
          >
            商品詳情
          </GeneralButton>
        );
      },
    },
    { field: "total", headerName: "訂單總額", width: 100 },
  ];
  const covertDataHandler = () => {
    let X = [];
    ordersData.forEach((item) => {
      X.push({
        id: item._id,
        orderId: item._id,
        createdAt: dayjs(item.createdAt).format("YYYY/MM/DD"),
        address: item.address.city + item.address.area + item.address.street,
        consignee: item.consignee,
        phone: item.phone,
        products: item.products,
        total: item.total.toLocaleString(),
      });
    });

    setConvertData(X);
  };

  useEffect(() => {
    isSuccess && covertDataHandler();
  }, [ordersData, isSuccess]);
  return (
    <DataBox>
      <Typography textAlign="center" marginY="2rem" variant="h4">
        OrdersPage
      </Typography>
      {convertData ? (
        <div style={{ height: 700, width: "100%" }}>
          <DataGrid
            rows={convertData}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
            getRowId={(row) => row.id}
          />
        </div>
      ) : (
        <p>數據加載中</p>
      )}
      {productDetailOpen && (
        <ProductDetail
          setProductDetailOpen={setProductDetailOpen}
          singleProductData={singleProductData}
        />
      )}
    </DataBox>
  );
};

export default OrdersPage;
