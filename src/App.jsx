import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./Pages/Components/Footer";
import Header from "./Pages/Components/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./firebase.init";
import { createContext, useEffect, useState } from "react";
import { AuthContext } from "./Pages/Dashboard/AuthClient/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getSettingsData } from "./api/AllApi";
import { getAuth } from "firebase/auth";

function App() {
  const user = useAuthState(auth);
  const email = getAuth()?.currentUser?.email
 
  // const email = user[0]?.email;
  const { data, isPending, refetch } = useQuery({
    queryKey: ["userEmail"],
    queryFn: () =>
      axios.get(`https://server-site-psi-inky.vercel.app/api/user/${email}`),
  });

  let rol = "";
  if (!isPending) {
    rol = data?.data.rol;
  }

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true); // button দেখাবে
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    console.log("User choice:", result.outcome);

    setDeferredPrompt(null);
    setShowInstall(true);
  };

  const { data: settings, isPending: settingPending } = useQuery({
    queryKey: ["getSettingsData"],
    queryFn: getSettingsData,
    refetchInterval: 1000,
  });

  refetch();
  return (
    <AuthContext.Provider value={{ email, rol, settings }}>
      <div className=" font-serif">
        <Header />

        <div>
          {showInstall && (
            <button
              onClick={installApp}
              className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded shadow"
            >
              Install App
            </button>
          )}
        </div>

        <Outlet />
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
