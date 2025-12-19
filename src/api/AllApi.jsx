import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

//  const api = axios.create({
//     baseURL: "https://server-site-psi-inky.vercel.app/api",
//   });

const api = axios.create({
  baseURL: " http://localhost:5000/api",
});

export const fetchRider = async () => {
  const res = await api.get(`/riders`);
  return res.status === 200 ? res.data : null;
}
export const fetchActiveUser = async (email) => {
  const res = await api.get(`/user/${email}`);
  return res.status === 200 ? res.data : null;
}

export const fetchProductForUser = async () => {
  const res = await api.get("/product");
  return res.status === 200 ? res.data : [];
};

export const fetchCart = async (email) => {
  const res = await api.get(`/cart/${email}`);
  return res.status === 200 ? res.data : "";
};

export const cofirmOrder = async (email) => {
  const res = await api.delete(`/cart/${email}`);
};

export const fetchAllCategorys = async () => {
  const res = await api.get("/category");
  return res.status === 200 ? res.data : [];
};
export const fetchConfirmOrders = async () => {
  const res = await api.get(`/confirm-order`);
  return res.status === 200 ? res.data : [];
};
export const fetchConfirmOrderById = async (id) => {
  const res = await api.get(`/confirm-order/${id}`);
  return res.status === 200 ? res.data : [];
};
export const fetchConfirmOrderByEmail = async (email) => {
  const res = await api.get(`/confirm-order/customer/${email}`);
  return res.status === 200 ? res.data : [];
};
export const fetchAllConfirmOrderByEmail = async (email) => {
  const res = await api.get(`/confirm-order/history/${email}`);
  return res.status === 200 ? res.data : [];
};
export const updateConfirmOrderStatus = async (id, data) => {
  const res = await api.patch(`/update-confirm-order/${id}`, data);
  return res.status === 200 ? res.data : [];
};
export const fetchRiderWithOrders = async (email) => {
  const res = await api.get(`/riders/${email}`);
  return res.status === 200 ? res.data : [];
};
export const fetchSeacrhProduct = async (text) => {
  const res = await api.get(`/search?text=${text}`);
  return res.status === 200 ? res.data : [];
};

export const riderWallet = async (email) => {
  const res = await api.get(`/riders/all-data/${email}`);
  return res.status === 200 ? res.data : [];
}
export const getAddressFromLocation = async (lat,lng) => {
  const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
  return res.status === 200 ? res.data : [];
}

