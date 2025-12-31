import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PaperPlainLoader from "../Pages/Components/Loader/PaperPlainLoader";
import { AuthContext } from "../Pages/Dashboard/AuthClient/AuthContext";
import { getconfirmOrderByEmail } from "../api/AllApi";

const SkipInfo = ({ children }) => {
  const { email } = useContext(AuthContext);
  const navigate = useNavigate();

const { data: address, isLoading } = useQuery({
    queryKey: ["getconfirmOrderByEmail", email],
    queryFn: () => getconfirmOrderByEmail(email),
    refetchInterval: 1000,
  });

{/* <>

  // const [address, setAddress] = useState(true);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
    //   const data = localStorage.getItem("address");
    //   const parsData = JSON.parse(data)
    //   if (parsData) {
      //     setAddress(parsData);
      
      //   }
      // }, []);
      
      // const data = localStorage.getItem("address");
  // const infoEmail = JSON.parse(data);
  </> */}

  
  if (isLoading) {
    return <PaperPlainLoader />;
  }


  if (address?.data.email) {
    return navigate("/cart/payment");
  } else {
    return children;
  }
};

export default SkipInfo;
