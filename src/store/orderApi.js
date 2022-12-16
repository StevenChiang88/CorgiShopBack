import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const orderApi = createApi({
  reducerPath: "orderApi", //Api的名稱，不能重複
  baseQuery: fetchBaseQuery({
    baseUrl: "https://corgishopserver.onrender.com/",
    prepareHeaders: (headers, { getState }) => {
      //先獲得用戶token (用LocalStorage的Token不好，怕會過期)，
      //應該要用redux內的token，但是這邊調用不了useSelector
      //所以解構prepareHeaders，拿到getState

      const token = getState().auth.token;
      //因為原先headers就有預設，所以不能覆蓋掉，就要在原來headers再加入新的
      if (token) {
        headers.set("token", `Bearer ${token}`);
      }
      return headers;
    },
  }), //發送請求使用的工具
  endpoints(build) {
    // endpoints 用來指定Api中的功能，是一個函式，需要一個物件作為return
    return {
      //前面是命名，後面是透過build來設定請求
      getOrders: build.query({
        query() {
          //query設定請求的子路徑
          return "order";
        },
        providesTags: ["order"],
      }),
      getOrdersRevenue: build.query({
        query() {
          //query設定請求的子路徑
          return "order/revenue";
        }, //query查詢
      }),
    };
  },
});

//Api創建後，會自動生成hook，再將他export
//命名規則 getStudents => useGetStudentsQuery

export const { useGetOrdersQuery, useGetOrdersRevenueQuery } = orderApi;

//將這個Api export出store的index.js
export default orderApi;
