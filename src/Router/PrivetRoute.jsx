import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const PrivetRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();
  if (loading) {
    return (
      <div  className="flex justify-center items-center mt-20">
       <span className="loading loading-spinner  loading-xl w-32 h-32"></span>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default PrivetRoute;
