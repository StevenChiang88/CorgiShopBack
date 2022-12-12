import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const authApi = createApi({
  reducerPath: "authApi", //Api的名稱，不能重複
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nrnrut.deta.dev/",
  }),
  endpoints(build) {
    return {
      userLogin: build.mutation({
        query(user) {
          //query設定請求的子路徑
          return {
            url: "auth/login",
            method: "post",
            body: user,
          };
        },
      }),

      //   userSignUp: build.mutation({
      //     query(user) {
      //       //query設定請求的子路徑
      //       return {
      //         url: "auth/register",
      //         method: "post",
      //         body: user,
      //       };
      //     },
      //   }),
    };
  },
});

//Api創建後，會自動生成hook，再將他export
//命名規則 getStudents => useGetStudentsQuery

export const { useUserLoginMutation } = authApi;

//將這個Api export出store的index.js
export default authApi;
