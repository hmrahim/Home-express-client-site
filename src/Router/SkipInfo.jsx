import React, { useContext } from "react";
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
  const user = useAuthState(auth);
  // const email = user[0]?.email;
  const { data, isPending } = useQuery({
    queryKey: ["confirmOrderByEmail"],
    queryFn: () => getconfirmOrderByEmail(email),
    refetchInterval:1000
  });

  const dataEmail = data?.data.email;
  if (isPending) {
    return <PaperPlainLoader />;
  }
  if (dataEmail) {
    return navigate("/cart/payment");
  } else {
    return children;
  }
};

export default SkipInfo;
