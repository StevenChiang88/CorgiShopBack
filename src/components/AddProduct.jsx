import { Input, Box, Dialog, InputLabel, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { GeneralButton } from "../styles/styledcomponents";
import { fireBaseFn } from "../firebase/firebase";
import { useAddProductMutation } from "../store/productApi";

const AddProduct = ({ setAddProductOpen }) => {
  const [addProductFn, addProductError] = useAddProductMutation();
  const addProductHandler = async (data2) => {
    const res = await addProductFn(data2);
    if (res.error) {
      alert("請確定所有資料都已填入，且商品名稱不得重複");
    } else {
      alert("添加成功");
      setAddProductOpen(false);
    }
  };
  const [data, setData] = useState({
    title: null,
    desc: null,
    categories: [],
    color: null,
    price: null,
  });
  const [file, setFile] = useState();

  //submitHandler 最終給提交按鈕觸發
  const submitHandler = (e) => {
    e.preventDefault();
    if (!file) {
      alert("請指定檔案");
    }
    fireBaseFn(file, data, addProductHandler);
  };
  return (
    <Dialog
      open={true}
      onClose={() => {
        setAddProductOpen(false);
      }}
    >
      <Box
        sx={{
          padding: "2rem",
          height: { md: "600px" },
          width: { sm: "400px", md: "500px" },
        }}
      >
        <form>
          <InputLabel sx={{ marginY: "1rem" }}>商品名稱</InputLabel>
          <Input
            onChange={(e) => {
              setData({ ...data, title: e.target.value });
            }}
            placeholder="商品名稱"
          />
          <InputLabel sx={{ marginY: "1rem" }}>商品價格</InputLabel>
          <Input
            type="number"
            onChange={(e) => {
              setData({ ...data, price: e.target.value });
            }}
            placeholder="商品價格"
          />
          <InputLabel sx={{ marginY: "1rem" }}>商品種類</InputLabel>
          <Input
            onChange={(e) => {
              setData({ ...data, categories: e.target.value.split("-") });
            }}
            fullWidth={true}
            placeholder="請用-分開類別。例如:柯基-手提袋-藍色"
          />
          <InputLabel sx={{ marginY: "1rem" }}>上傳圖片</InputLabel>
          <input
            onChange={(e) => {
              setFile(e.target.files[0]);
              console.log(file);
            }}
            type="file"
          />
          <InputLabel sx={{ marginY: "1rem" }}>商品描述</InputLabel>
          <TextField
            onChange={(e) => {
              setData({ ...data, desc: e.target.value });
            }}
            multiline={true}
            fullWidth={true}
            rows={5}
            placeholder="商品描述"
          />
        </form>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-start",
            marginY: "1rem",
          }}
        >
          <GeneralButton
            sx={{ marginRight: "1rem" }}
            onClick={() => {
              setAddProductOpen(false);
            }}
          >
            取消新增
          </GeneralButton>
          <GeneralButton
            onClick={(e) => {
              // setAddProductOpen(false);
              submitHandler(e);
            }}
          >
            確認新增
          </GeneralButton>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddProduct;
