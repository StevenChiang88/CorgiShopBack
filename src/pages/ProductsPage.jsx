import React, { useEffect, useState } from "react";
import {
  useDelProductMutation,
  useGetProductsQuery,
} from "../store/productApi";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Input } from "@mui/material";
import dayjs from "dayjs";
import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DataBox, GeneralButton } from "../styles/styledcomponents";
import Edit from "../components/Edit";
import AddProduct from "../components/AddProduct";
import AlertModal from "../ui/AlertModal";

const ProductsPage = () => {
  const [keyword, setKeyword] = useState();
  const { data, isSuccess } = useGetProductsQuery();
  const [filteredData, setFilteredData] = useState();
  const [editOpen, setEditOpen] = useState(false);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [singleData, setSingleData] = useState();

  const [delRowId, setDelRowId] = useState();
  const [deleteFn, deleteError] = useDelProductMutation();
  const deleteHandler = async () => {
    const res = await deleteFn(delRowId);

    if (res.error) {
      alert("刪除失敗");
    } else {
      alert("刪除成功");
    }
  };

  const columns = [
    {
      field: "img",
      headerName: "照片",
      sortable: false,
      width: 120,
      renderCell: (row) => {
        return (
          <Box>
            <img
              style={{ width: "40px", height: "45px", objectFit: "cover" }}
              alt="照片"
              src={row.row.img}
            />
          </Box>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "建立日期",
      type: "date",
      width: 150,
      editable: true,
    },

    { field: "_id", headerName: "商品ID", width: 230 },
    {
      field: "title",
      headerName: "商品名稱",
      width: 150,
      editable: true,
    },

    {
      field: "price",
      headerName: "價格",
      width: 80,
      editable: true,
    },

    {
      field: "修改",
      headerName: "修改",
      sortable: false,
      width: 90,
      renderCell: (row) => {
        return (
          <GeneralButton
            onClick={() => {
              setSingleData(row);
              setEditOpen(true);
            }}
          >
            Edit
          </GeneralButton>
        );
      },
    },
    {
      field: "刪除",
      headerName: "刪除",
      sortable: false,
      width: 40,
      renderCell: (row) => {
        return (
          <DeleteForeverIcon
            onClick={() => {
              setModalShow(true);
              setDelRowId(row.row._id);
            }}
            sx={{ cursor: "pointer", color: "#FF744F" }}
          />
        );
      },
    },
  ];

  //MUI要ID，所以要將MongoDB拿出的數據再轉換
  const convertHandler = (RAW) => {
    let dataWithId = [];
    RAW.forEach((item) => {
      dataWithId.push({
        ...item,
        id: item._id,
        price: item.price.toLocaleString(),
        createdAt: dayjs(item.createdAt).format("YYYY/MM/DD"),
      });
    });
    setFilteredData(dataWithId);
  };

  useEffect(() => {
    isSuccess && convertHandler(data);
  }, [isSuccess, data]);

  const filterHandler = () => {
    const x = data.filter((item) => item.title.includes(keyword));
    convertHandler(x);
  };

  return (
    <>
      <DataBox>
        {filteredData ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: { xs: "600px", sm: "800px", md: "500px", lg: "600px" },
              padding: "2rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <div>
                <Input
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                  placeholder="請輸入商品名稱"
                />
                <SearchIcon
                  onClick={() => {
                    filterHandler();
                  }}
                  sx={{ cursor: "pointer" }}
                />
              </div>

              <GeneralButton
                onClick={() => {
                  setAddProductOpen(true);
                }}
                sx={{ marginTop: { xs: "2rem", sm: 0 } }}
              >
                新增商品
              </GeneralButton>
            </Box>
            <DataGrid
              style={{ backgroundColor: "white", marginTop: "2rem" }}
              rows={filteredData}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              getRowId={(row) => row.id}
            />
          </Box>
        ) : (
          <p>數據加載中</p>
        )}
      </DataBox>
      {editOpen && <Edit setEditOpen={setEditOpen} singleData={singleData} />}

      {addProductOpen && <AddProduct setAddProductOpen={setAddProductOpen} />}
      {delRowId && (
        <AlertModal
          setModalShow={setModalShow}
          modalShow={modalShow}
          confirmHandler={deleteHandler}
        />
      )}
    </>
  );
};

export default ProductsPage;
