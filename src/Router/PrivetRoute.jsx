import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import PaperPlainLoader from "../Pages/Components/Loader/PaperPlainLoader";
import { toast } from "react-toastify";

const PrivetRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  console.log(user);
  
  const location = useLocation();
  if (loading ) {
    return <PaperPlainLoader />;
  }
  if (!user ) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (user?.emailVerified !== true) {

    return <Navigate to="/verify-email" state={{ from: location }} replace />;
  }


  return children;
};

export default PrivetRoute;
