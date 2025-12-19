import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import PaperPlainLoader from "../Pages/Components/Loader/PaperPlainLoader";

const PrivetRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();
  if (loading) {
    return <PaperPlainLoader />;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default PrivetRoute;
