import { Box, Dialog, Input, InputLabel } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useUpdateUserMutation } from "../store/userApi";
import { GeneralButton } from "../styles/styledcomponents";

const EditUser = ({ singleUserData, setUserModalOpen }) => {
  const [userData, setUserData] = useState({
    _id: singleUserData.id,
  });
  const [editUserFn, isSuccess] = useUpdateUserMutation();
  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await editUserFn(userData);
    setUserModalOpen(false);
  };

  return (
    <Dialog
      open={true}
      onClose={() => {
        setUserModalOpen(false);
      }}
    >
      <Box sx={{ padding: "2rem" }}>
        <form>
          <InputLabel>使用者ID</InputLabel>
          <Input disabled={true} defaultValue={singleUserData.id} />
          <InputLabel>使用者名稱</InputLabel>
          <Input
            onChange={(e) => {
              setUserData({ ...userData, username: e.target.value });
            }}
            defaultValue={singleUserData.username}
          />
          <InputLabel>使用者Email</InputLabel>
          <Input
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
            defaultValue={singleUserData.email}
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
              setUserModalOpen(false);
            }}
          >
            取消修改
          </GeneralButton>
          <GeneralButton
            onClick={(e) => {
              submitHandler(e);
            }}
          >
            確認修改
          </GeneralButton>
        </Box>
      </Box>
    </Dialog>
  );
};

export default EditUser;
