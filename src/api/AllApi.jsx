import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";



 const api = axios.create({
    baseURL: "https://server-site-psi-inky.vercel.app/api",
  });

export const fetchProductForUser = async () => {
  const res = await api.get("/product");
  return res.status === 200 ? res.data : [];
};


export const fetchCart = async(email)=> {
    const res = await api.get(`/cart/${email}`)
    return res.status === 200 ? res.data : ""

}

export const cofirmOrder =async(email)=> {
  const res = await api.delete(`/cart/${email}`)
}

export const fetchAllCategorys = async()=> {
  const res = await api.get("/category")
  return res.status === 200 ? res.data : []
}