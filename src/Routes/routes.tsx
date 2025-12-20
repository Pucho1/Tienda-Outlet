import { createBrowserRouter, redirect } from "react-router-dom";

import Layout from '../components/Layout';
import PrivateRoutes from "./PrivateRoutes";
import PublicRoute from "./PublicsRoutes";


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children:[
      {
        path: "/products-list",
        lazy: async () => {
          const { default: Products } = await import("../pages/Products/Products");
          return { Component: Products };
        },
      },
      {
        path: "/product/:id",
        lazy: async () => {
          const { default: ProductDetail } = await import("../pages/ProductsDetails/ProductDetail");
          return { Component: ProductDetail };
        },
      },
    ]
  },

  {
    element: <PrivateRoutes />,
    children:[
      {
        element: <Layout />,
        children: [
          {
            path: "/user",
            lazy: async () => {
              const { default: UserPage } = await import("../pages/UserPage/UserPage");
              return { Component: UserPage };
            },
          },
          {
            path: "/editProduct/:id",
            lazy: async () => {
              const { default: EditProduct } = await import("../pages/EditProduct/EditProduct");
              return { Component: EditProduct };
            },
          },

        ]
      },
    ],
  },

  {
    element: <PublicRoute />,
    children:[
      {
        element: <Layout />,
        children: [
          {
            path: "/admin/login",
            lazy: async () => {
              const { default: Login } = await import("../pages/Login/Login");
              return { Component: Login };
            },
          },
        ]
      },
    ],
  },

  {
    path: "/",
    loader: () => redirect("/products-list"),
  },
  {
    path: "*",
    loader: () => redirect("/products-list"),
  },
]);
