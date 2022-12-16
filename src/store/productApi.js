import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const productApi = createApi({
  reducerPath: "productApi", //Api的名稱，不能重複
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
      getProducts: build.query({
        query() {
          //query設定請求的子路徑
          return "product";
        },
        providesTags: ["product"],
      }),
      getProductByCategory: build.query({
        query(cat) {
          //query設定請求的子路徑
          return `product?categories=${cat}`;
        }, //query查詢
      }),
      getProductById: build.query({
        query(id) {
          //query設定請求的子路徑
          return `product/find/${id}`;
        }, //query查詢
      }),
      delProduct: build.mutation({
        query(id) {
          //query設定請求的子路徑
          return {
            url: `product/delete/${id}`,
            method: "delete",
          };
        },
        invalidatesTags: ["product"],
      }), // mutation修改

      addProduct: build.mutation({
        query(product) {
          //query設定請求的子路徑
          return {
            url: "product/add",
            method: "post",
            body: product,
          };
        },
        invalidatesTags: ["product"],
      }), // mutation 新增

      updateProduct: build.mutation({
        query(newData) {
          return {
            url: `product/modify/${newData._id}`,
            method: "put",
            body: newData,
          };
        },
        invalidatesTags: ["product"],
      }), //mutation 更新
    };
  },
});

//Api創建後，會自動生成hook，再將他export
//命名規則 getStudents => useGetStudentsQuery

export const {
  useGetProductsQuery,
  useGetProductByCategoryQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useDelProductMutation,
  useUpdateProductMutation,
} = productApi;

//將這個Api export出store的index.js
export default productApi;
