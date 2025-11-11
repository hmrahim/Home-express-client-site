import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useNavigate } from "react-router-dom";

const LoggedOut = ({ children }) => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return (
      <div  className="flex justify-center items-center ">
       <span className="loading loading-spinner  loading-xl w-32 h-32"></span>
      </div>
    );
  }
  if (user) {
    return navigate("/dashboard");
  } else {
    return children;
  }
};

export default LoggedOut;
