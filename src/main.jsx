import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/Router.jsx";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./Pages/Components/ScrollToTop.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
          <ScrollToTop/>
        </RouterProvider>
        <ToastContainer />
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);
