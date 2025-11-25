import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./Pages/Components/Footer";
import Header from "./Pages/Components/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./firebase.init";
import { createContext } from "react";
import { AuthContext } from "./Pages/Dashboard/AuthClient/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";






function App() {
  const user = useAuthState(auth);
  const email = user[0]?.email;
  const { data, isPending, refetch } = useQuery({
    queryKey: ["userEmail"],
    queryFn: () => axios.get(`https://server-site-psi-inky.vercel.app/api/user/${email}`),
  });

  let rol = "";
  if (!isPending) {
    rol = data.data.rol;
  }

 

  refetch();
  return (
    <AuthContext.Provider value={{ email, rol }}>
      <div className=" font-serif">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
