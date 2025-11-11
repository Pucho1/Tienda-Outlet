import { createBrowserRouter, redirect } from "react-router-dom";

import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicsRoutes";
import Layout from "../components/Layout";


export const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <Layout />,
        children: [
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
              const { default: ProductDetail } = await import("../pages/ProductDetail");
              return { Component: ProductDetail };
            },
          },
          {
            path: "/user",
            lazy: async () => {
              const { default: UserPage } = await import("../pages/UserPage/UserPage");
              return { Component: UserPage };
            },
          },
          {
            path: "/cart",
            lazy: async () => {
              const { default: ShopCart } = await import("../pages/ShopCar/ShopCart");
              return { Component: ShopCart };
            },
          },
          {
            path: "/",
            loader: () => redirect("/products-list"),
          },
          {
            path: "*",
            loader: () => redirect("/products-list"),
          },
        ],
      },
    ],
  },
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/login",
        lazy: async () => {
          const { default: Login } = await import("../pages/Login/Login");
          return { Component: Login };
        },
      },
      {
        path: "*",
        loader: () => redirect("/login"),
      },
    ],
  },
]);
