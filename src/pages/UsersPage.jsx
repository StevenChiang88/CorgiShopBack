import React from "react";
import { useGetUsersQuery } from "../store/userApi";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useState } from "react";
import { useEffect } from "react";
import { DataBox, GeneralButton } from "../styles/styledcomponents";
import EditUser from "../components/EditUser";

const UsersPage = () => {
  const { data: usersData, isSuccess } = useGetUsersQuery();
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [singleUserData, setSingleUserData] = useState();
  const [convertData, setConvertData] = useState();
  const columns = [
    { field: "id", headerName: "用戶ID", width: 250 },
    { field: "username", headerName: "用戶名", width: 120 },
    { field: "email", headerName: "信箱", width: 250 },
    { field: "createdAt", headerName: "創建日期", width: 130 },
    { field: "updatedAt", headerName: "修改日期", width: 130 },

    {
      field: "idForModify",
      headerName: "修改資料",
      sortable: false,
      width: 130,
      renderCell: (row) => {
        return (
          <GeneralButton
            onClick={() => {
              setSingleUserData(row.row);
              setUserModalOpen(true);
            }}
          >
            修改
          </GeneralButton>
        );
      },
    },
  ];

  const covertDataHandler = () => {
    let X = [];
    usersData.forEach((item) => {
      X.push({
        id: item._id,
        idForModify: item._id,
        username: item.username,
        email: item.email,
        createdAt: dayjs(item.createdAt).format("YYYY/MM/DD"),
        updatedAt: dayjs(item.updatedAt).format("YYYY/MM/DD"),
      });
    });

    setConvertData(X);
  };

  useEffect(() => {
    isSuccess && covertDataHandler();
  }, [usersData, isSuccess]);
  return (
    <DataBox>
      <Typography textAlign="center" marginY="2rem" variant="h4">
        UsersPage
      </Typography>
      {convertData ? (
        <div style={{ height: "58vh", width: "100%" }}>
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
      {userModalOpen && (
        <EditUser
          setUserModalOpen={setUserModalOpen}
          singleUserData={singleUserData}
        />
      )}
    </DataBox>
  );
};

export default UsersPage;
