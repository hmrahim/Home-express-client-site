import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import profile from "../../../assets/profile.jpg";
import "./customar.css";
import { signOut } from "firebase/auth";
import auth from "../../../firebase.init";
import Header from "../../Components/Header";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContextDashboard } from "../AuthClient/AuthContextDashboard";
import { fetchConfirmOrderByEmail } from "../../../api/AllApi";
import RiderDashboard from "./Wallet";
import Wallet from "./Wallet";
import CurrentOrders from "./CurrentOrders";
import RiderSearchingComponent from "./RiderSearchingComponent";
import { Helmet } from "react-helmet-async";

const CustomersDashboard = () => {
  const { email } = useContext(AuthContextDashboard);

  const { data, isPending, refetch } = useQuery({
    queryKey: ["userByEmail"],
    queryFn: () =>
      axios.get(`https://server-site-psi-inky.vercel.app/api/user/${email}`),
  });

  const { data:Odata, isPending:oLoading } = useQuery({
    queryKey: ["fetchRiderWithOrders"],
    queryFn: () => fetchRiderWithOrders(email),
    refetchInterval: 10000,
  });
  const lengthCount = Odata?.orders?.filter((data) => data?.status === "confirmed");
  

 

  const navigate = useNavigate();
  const handleSignOut = async () => {
    // await signOut()
    signOut(auth);
    navigate("/");
  };

  return (
    <div>
      <Header cemail={email} />
        <Helmet>
              <title>Dashboard</title>
            </Helmet>
      <div className="w-full min-h-screen bg-gray-300 mt-16 md:mt-16 font-serif">
        <div className="w-full md:w-5/6 mx-auto flex flex-col  md:flex-row md:flex-row-reverse  flex-col-reverse justify-around  py-5 gap-5 ">
          <div className="bg-base-100 w-full md:w-3/4  md:px-5 rounded-lg ">
            <Outlet />
          </div>

          <div className="bg-base-100 md:w-1/4 w-full px-2  rounded-lg">
            <div className=" rounded-xl overflow-hidden   flex flex-col items-center shadow-lg bg-white font-Roboto-light">
              <div className="bg-primary relative h-32 md:h-24 rounded-lg mt-2 w-full ">
                <div className="md:max-w-36 md:max-h-36 max-w-40 max-h-40 rounded-full absolute top-10   left-24 md:left-14 md:top-4 overflow-hidden rounded-full shadow-gray-400  shadow-xl border border-primary border-4">
                  <img className="" src={profile} alt="" />
                </div>
              </div>
              <div className=" flex flex-col mt-4">
                <h1 className="metallic-text mt-16 text-center uppercase">
                  {data?.data.name}
                </h1>
                <p className="text-center font-bold m-0">{data?.data.email}</p>
                <Link className="btn btn-xs btn-primary ">Edit Profile</Link>
                <div className="divider"></div>
              </div>
              <div>


                {

                  data?.data.rol === "rider" ? 
                
                <ul className="menu menu-md bg-base-300 rounded-box md:w-60 w-96 mb-8">
                  <li className="hover:bg-primary rounded-lg bg-base-300 border-b-2 border-primary mb-2">
                    <Link
                      to="/dashboard/current-order"
                      className="hover:text-base-100"
                    >
                      Current Order  {lengthCount?.length > 0 && <span className="badge badge-warning ml-2">{lengthCount?.length}</span>}
                    </Link>
                  </li>
                  <li className="hover:bg-primary rounded-lg bg-base-300 border-b-2 border-primary mb-2">
                    <Link
                      to="/dashboard/Wallet"
                      className="hover:text-base-100"
                    >
                      Wallet
                    </Link>
                  </li>
                  <li className="hover:bg-primary rounded-lg bg-base-300 border-b-2 border-primary mb-2">
                    <Link
                      to="/dashboard/delivery-history"
                      className="hover:text-base-100"
                    >
                      Delivery History
                    </Link>
                  </li>
                  <li className="hover:bg-primary rounded-lg bg-base-300 border-b-2 border-primary mb-2">
                    <Link
                      to="/dashboard/my-orders"
                      className="hover:text-base-100"
                    >
                      My Orders
                    </Link>
                  </li>
                  <li className="hover:bg-primary rounded-lg bg-base-300 border-b-2 border-primary mb-2">
                    <Link
                      to="/dashboard/profile"
                      className="hover:text-base-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="hover:bg-primary rounded-lg bg-base-300 border-b-2 border-primary mb-2">
                    <Link
                      to="/dashboard/order-history"
                      className="hover:text-base-100"
                    >
                      Order History
                    </Link>
                  </li>

                  <button
                    onClick={handleSignOut}
                    className=" btn btn-sm btn-error"
                  >
                    Logout
                  </button>
                </ul>
                : 
                <ul className="menu menu-md bg-base-300 rounded-box md:w-60 w-96 mb-8">
               
                  <li className="hover:bg-primary rounded-lg bg-base-300 border-b-2 border-primary mb-2">
                    <Link
                      to="/dashboard/my-orders"
                      className="hover:text-base-100"
                    >
                      My Orders
                    </Link>
                  </li>
                  <li className="hover:bg-primary rounded-lg bg-base-300 border-b-2 border-primary mb-2">
                    <Link
                      to="/dashboard/profile"
                      className="hover:text-base-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="hover:bg-primary rounded-lg bg-base-300 border-b-2 border-primary mb-2">
                    <Link
                      to="/dashboard/order-history"
                      className="hover:text-base-100"
                    >
                      Order History
                    </Link>
                  </li>

                  <button
                    onClick={handleSignOut}
                    className=" btn btn-sm btn-error"
                  >
                    Logout
                  </button>
                </ul>
                }
              </div>
              <div></div>
            </div>

            <div className="px-5 md:px-0">
              <div></div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CustomersDashboard;
