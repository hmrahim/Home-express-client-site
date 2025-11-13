import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Client/Home/Home";
import Signup from "../Pages/Client/Auth/Signup";
import Login from "../Pages/Client/Auth/Login";
import ResetPass from "../Pages/Client/Auth/ResetPass";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivetRoute from "./PrivetRoute";
import DashHome from "../Pages/Dashboard/DashHome";
import LoggedOut from "./LoggedOut";
import AddProduct from "../Pages/Dashboard/Product/AddProduct";
import AllProducts from "../Pages/Dashboard/Product/AllProducts";
import UpdateProduct from "../Pages/Dashboard/Product/UpdateProduct";
import AddCategory from "../Pages/Dashboard/Categorys/AddCategory";
import AllCategory from "../Pages/Dashboard/Categorys/AllCategory";
import UpdateCategory from "../Pages/Dashboard/UpdateCategory";
import ProductView from "../Pages/Client/Home/ProductView";
import ALlUsers from "../Pages/Dashboard/Users/ALlUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "product-details/:id",
        Component: ProductView,
      },
    ],
  },
  {
    path: "/signup",
    element: (
      <LoggedOut>
        <Signup />
      </LoggedOut>
    ),
  },
  {
    path: "/login",
    element: (
      <LoggedOut>
        <Login />
      </LoggedOut>
    ),
  },
  {
    path: "/resetpass",
    Component: ResetPass,
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRoute>
        <Dashboard />
      </PrivetRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashHome />,
      },
      {
        path: "/dashboard/add-product",
        Component: AddProduct,
      },
      {
        path: "/dashboard/all-product",
        Component: AllProducts,
      },
      {
        path: "/dashboard/update-product/:id",
        Component: UpdateProduct,
      },
      {
        path: "/dashboard/add-category",
        Component: AddCategory,
      },
      {
        path: "/dashboard/all-category",
        Component: AllCategory,
      },
      {
        path: "/dashboard/update-category/:id",
        Component: UpdateCategory,
      },
      {
        path: "/dashboard/all-users",
        Component: ALlUsers,
      },
    ],
  },
]);
