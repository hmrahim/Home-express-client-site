import React, { useContext } from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";
import { getProfileData } from "../../api/AllApi";
import { AuthContextDashboard } from "./AuthClient/AuthContextDashboard";


const Navbar = () => {
    const { email } = useContext(AuthContextDashboard);
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  // const [signOut] = useSignOut(auth);
  const navigate  = useNavigate();
 const handleSignOut = async () => {
    // await signOut()
    signOut(auth);
    navigate('/')
  }

    const { data, isPending } = useQuery({
      queryKey: ["getProfileData", email],
      queryFn: () => getProfileData(email),
      refetchInterval: 5000,
    });
  return (
    <div className="navbar bg-gradient-to-r from-green-500 to-emerald-600  text-primary-content fixed top-0 z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <label
            htmlFor="my-drawer"
            tabIndex={0}
            className="btn btn-ghost btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost  text-2xl font-bold tracking-[5px]">Moom24</Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={` ${data?.image ? data?.image : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} `}
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-primary text-white rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
          
            <li>
              <Link to="/dashboard/profile">Profile</Link>
            </li>
            <li>
              <Link to="/dashboard/settings">Settings</Link>
            </li>
            <li>
              <Link  onClick={handleSignOut}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
