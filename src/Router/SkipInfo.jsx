import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SkipInfo = ({ children }) => {
  const navigate = useNavigate();
  const user = useAuthState(auth);
  const email = user[0]?.email;
  const { data, isPending, refetch } = useQuery({
    queryKey: ["confirmOrderByEmail"],
    queryFn: () =>
      axios.get(`https://server-site-psi-inky.vercel.app/api/confirm-order/${email}`),
  });
  const dataEmail = data?.data[0]?.email;
  if(isPending){
    return "Loading"
  }
  if (dataEmail) {
    return navigate("/cart/payment");
  }else{
 return children;
  }

 
};

export default SkipInfo;
