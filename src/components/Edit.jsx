import { Input, Box, Dialog, InputLabel, TextField } from "@mui/material";

import React from "react";
import { useState } from "react";
import { fireBaseFn } from "../firebase/firebase";
import { useUpdateProductMutation } from "../store/productApi";
import { GeneralButton } from "../styles/styledcomponents";

const Edit = ({ setEditOpen, singleData }) => {

  const [data, setData] = useState({
    _id: singleData.row._id,
  });
  const [file, setFile] = useState();
  const [editFn, editError] = useUpdateProductMutation();
  const editHandler = async (data2) => {
    const res = await editFn(data2);
    if (res.error) {
      alert("修改失敗");
    } else {
      alert("修改成功");
    }
  };

  console.log(file);
  console.log(data, "輸入修改");

  const submitHandler = () => {
    if (!file) {
      editHandler(data);
    } else {
      fireBaseFn(file, data, editHandler);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={() => {
        setEditOpen(false);
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
            defaultValue={singleData.row.title}
          />
          <InputLabel sx={{ marginY: "1rem" }}>商品價格</InputLabel>
          <Input
            onChange={(e) => {
              setData({ ...data, price: e.target.value });
            }}
            defaultValue={Number(singleData.row.price.replace(",", "").trim())}
          />
          <InputLabel sx={{ marginY: "1rem" }}>更新圖片</InputLabel>
          <input
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            type="file"
          />
          <InputLabel sx={{ marginY: "1rem" }}>商品種類</InputLabel>
          <Input
            onChange={(e) => {
              setData({ ...data, categories: e.target.value.split("-") });
            }}
            defaultValue={singleData.row.categories
              .join(",")
              .replace(/,/g, "-")
              .split()}
          />
          <InputLabel sx={{ marginY: "1rem" }}>商品描述</InputLabel>
          <TextField
            onChange={(e) => {
              setData({ ...data, desc: e.target.value });
            }}
            multiline={true}
            rows={5}
            fullWidth={true}
            defaultValue={singleData.row.desc}
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
              setEditOpen(false);
            }}
          >
            取消修改
          </GeneralButton>
          <GeneralButton
            onClick={() => {
              setEditOpen(false);
              submitHandler();
            }}
          >
            確認修改
          </GeneralButton>
        </Box>
      </Box>
    </Dialog>
  );
};

export default Edit;
