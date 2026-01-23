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
import Cart from "../Pages/Cart/Cart";
import CustomarInfo from "../Pages/Cart/CustomarInfo";
import Payment from "../Pages/Cart/Payment";
import SkipInfo from "./SkipInfo";
import AuthClient from "../Pages/Dashboard/AuthClient/AuthClient";
import LoginClient from "../Pages/Dashboard/AuthClient/LoginClient";
import SignUpClient from "../Pages/Dashboard/AuthClient/SignUpClient";
import ResetClientPassword from "../Pages/Dashboard/AuthClient/ResetClientPassword";
import CustomersDashboard from "../Pages/Dashboard/Customers-Dashboard/CustomersDashboard";
import Orders from "../Pages/Dashboard/Orders/Orders";
import ConfirmedOrder from "../Pages/Dashboard/Orders/ConfirmedOrder";
import DeliveredOrder from "../Pages/Dashboard/Orders/DeliveredOrder";
import CanceledOrder from "../Pages/Dashboard/Orders/CanceledOrder";
import PendingOrder from "../Pages/Dashboard/Orders/PendingOrder";
import ViewOrder from "../Pages/Dashboard/Orders/ViewOrder";
import MyOrder from "../Pages/Dashboard/Customers-Dashboard/MyOrder";
import OrderHistory from "../Pages/Dashboard/Customers-Dashboard/OrderHistory";
import Profile from "../Pages/Dashboard/Customers-Dashboard/Profile";
import Wallet from "../Pages/Dashboard/Customers-Dashboard/Wallet";
import DeliveryHistory from "../Pages/Dashboard/Customers-Dashboard/DeliveryHistory";
import CurrentOrders from "../Pages/Dashboard/Customers-Dashboard/CurrentOrders";
import Settings from "../Pages/Dashboard/Settings";
import PolicyLayout from "../Pages/Policies/PolicyLayout";
import PrivacyPolicy from "../Pages/Policies/PrivacyPolicy";
import TermsConditions from "../Pages/Policies/TermsConditions";
import RefundPolicy from "../Pages/Policies/RefundPolicy";
import About from "../Pages/Client/About/About";
import Services from "../Pages/Client/Services/Services";
import Contact from "../Pages/Client/Contact/Contact";
import Visitors from "../Pages/Dashboard/Visitors/Visitors";
import ErrorPage from "../Pages/404/ErrorPage";
import AddPromoCode from "../Pages/Dashboard/PromoCode/AddPromoCode";
import AllPromocode from "../Pages/Dashboard/PromoCode/AllPromocode";
import UpdatePromo from "../Pages/Dashboard/PromoCode/UpdatePromo";
import AdminProductForm from "../Pages/Dashboard/Product/AdminProductForm";
import AllEmails from "../Pages/Dashboard/Emails/AllEmails";
import VIewEmail from "../Pages/Dashboard/Emails/VIewEmail";

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
        path: "/about",
        element: <About />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "product-details/:id",
        Component: ProductView,
      },
      {
        path: "cart",
        element: <Cart />,
        children: [
          {
            path: "/cart/customar-info",
            element: (
              <SkipInfo>
                <CustomarInfo />
              </SkipInfo>
            ),
          },
          {
            path: "/cart/payment",
            Component: Payment,
          },
        ],
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
    path: "/auth-client",
    element: <AuthClient />,
    children: [
      {
        path: "/auth-client/signup-client",
        Component: SignUpClient,
      },
      {
        path: "/auth-client/client-reset-password",
        Component: ResetClientPassword,
      },
    ],
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
        path: "/dashboard/add-varient",
        Component: AdminProductForm,
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
      {
        path: "/dashboard/settings",
        Component: Settings,
      },
      {
        path: "/dashboard/visitors",
        Component: Visitors,
      },
      {
        path: "/dashboard/add-promocode",
        Component: AddPromoCode,
      },
      {
        path: "/dashboard/all-promocode",
        Component: AllPromocode,
      },
      {
        path: "/dashboard/update-promo/:id",
        Component: UpdatePromo,
      },
      {
        path: "/dashboard/all-emails",
        Component: AllEmails,
      },
      {
        path: "/dashboard/view-emails/:id",
        Component: VIewEmail,
      },

      {
        path: "/dashboard/orders",
        Component: Orders,
        children: [
          {
            path: "/dashboard/orders/confirmed-order",
            Component: ConfirmedOrder,
          },
          {
            path: "/dashboard/orders/delivered-order",
            Component: DeliveredOrder,
          },
          {
            path: "/dashboard/orders/canceled-order",
            Component: CanceledOrder,
          },
          {
            path: "/dashboard/orders/pending-order",
            Component: PendingOrder,
          },
          {
            path: "/dashboard/orders/view-order/:id",
            Component: ViewOrder,
          },
        ],
      },

      {
        path: "/dashboard",
        Component: "",
        children: [
          {
            path: "/dashboard/my-orders",
            Component: MyOrder,
          },
          {
            path: "/dashboard/profile",
            Component: Profile,
          },
          {
            path: "/dashboard/order-history",
            Component: OrderHistory,
          },
          {
            path: "/dashboard/wallet",
            Component: Wallet,
          },
          {
            path: "/dashboard/delivery-history",
            Component: DeliveryHistory,
          },
          {
            path: "/dashboard/current-order",
            Component: CurrentOrders,
          },
        ],
      },
    ],
  },
  {
    path: "/policies",
    Component: PolicyLayout,
    children: [
      {
        path: "/policies/privacy-policy",
        Component: PrivacyPolicy,
      },
      {
        path: "/policies",
        Component: PrivacyPolicy,
      },
      {
        path: "/policies/terms-conditions",
        Component: TermsConditions,
      },
      {
        path: "/policies/refund-policy",
        Component: RefundPolicy,
      },
    ],
  },
  {
    path:"*",
    element:<ErrorPage/>
  }
]);
