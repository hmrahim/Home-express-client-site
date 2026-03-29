import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { getAuth } from "firebase/auth";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
// });

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_LOCAL,
});

api.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    const user = auth?.currentUser;

    if (user) {
      const token = user.accessToken;
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ===========================user api===============================

export const postUser = async (user) => {
  const res = await api.post(`/user`, user);
  return res.status === 200 ? res : null;
};
export const getAllUser = async (user) => {
  const res = await api.get(`/user`);
  return res.status === 200 ? res.data : null;
};
export const getUserByEmail = async (email) => {
  const res = await api.get(`/user/${email}`);
  return res.status === 200 ? res : null;
};
export const updateUserRoll = async (data) => {
  const res = await api.put(`/user/role`, data);
  return res.status === 200 ? res : null;
};
export const getUserLocation = async (lat, lng) => {
  const res = await axios.get(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
  );
  return res.status === 200 ? res : null;
};

// =======================Payment===============================
export const confirmedOrderWithPayment = async (items, email) => {
  const res = await api.put(`/confirm-order/${email}`, items);
  return res.status === 200 ? res : null;
};
export const confirmOrder = async (items) => {
  const res = await api.post(`/confirm-order`, { items });
  return res.status === 200 ? res : null;
};
export const updateLocation = async (items, email) => {
  const res = await api.patch(`/update-location/${email}`, items );
  return res.status === 200 ? res : null;
};

export const getconfirmOrderByEmail = async (email) => {
  const res = await api.get(`/confirm-order/${email}`);
  return res.status === 200 ? res : null;
};
export const getDistanceApi = async (email) => {
  const res = await api.get(`/distence-customer/${email}`);
  return res.status === 200 ? res.data : null;
};

// =================product api=======================

export const postProduct = async (Pdata) => {
  const res = await api.post(`/product`, Pdata);
  return res.status === 200 ? res : null;
};
export const updateProduct = async (id, uPdata) => {
  const res = await api.patch(`/product/${id}`, uPdata, {});
  return res.status === 200 ? res : null;
};
export const getAllProduct = async () => {
  const res = await api.get(`/product`);
  return res.status === 200 ? res.data : null;
};
export const getAllProductByCategory = async (category) => {
  const res = await api.get(`/product/category/${category}`);
  return res.status === 200 ? res.data : null;
};
export const getProductById = async (id) => {
  const res = await api.get(`/product/${id}`);
  return res.status === 200 ? res.data : null;
};
export const deleteProducts = async (id) => {
  const res = await api.delete(`/product/${id}`);
  return res.status === 200 ? res.data : null;
};
export const delete_variants = async (id) => {
  const res = await api.delete(`/product/${id}`);
  return res.status === 200 ? res.data : null;
};

export const infiniteScroll = async ({ pageParam = 1 }) => {
  const res = await api.get(`/infinite-scroll?page=${pageParam}&limit=10`);
  return res.status === 200 ? res.data : null;
};

//==================Category api==================

export const fetchAllCategorys = async () => {
  const res = await api.get("/category");
  return res.status === 200 ? res.data : [];
};
export const getCategoryById = async (id) => {
  const res = await api.get(`/category/${id}`);
  return res.status === 200 ? res.data : [];
};
export const postCategory = async (category) => {
  const res = await api.post(`/category`, category);
  return res.status === 200 ? res : null;
};
export const putCategory = async (id, data) => {
  const res = await api.put(`/category/${id}`, data);
  return res.status === 200 ? res : null;
};
export const deleteCategoryById = async (id) => {
  const res = await api.delete(`/category/${id}`);
  return res.status === 200 ? res : null;
};

export const fetchRider = async () => {
  const res = await api.get(`/riders`);
  return res.status === 200 ? res.data : null;
};

export const fetchActiveUser = async (email) => {
  const res = await api.get(`/user/${email}`);
  return res.status === 200 ? res.data : null;
};

export const fetchProductForUser = async () => {
  const res = await api.get("/product");
  return res.status === 200 ? res.data : [];
};

// =====================cart api========================
export const fetchCart = async (email) => {
  const res = await api.get(`/cart/${email}`);
  return res.status === 200 ? res.data : "";
};
export const addToCartData = async (items) => {
  const res = await api.post(`/cart`, items);
  return res.status === 200 ? res : "";
};
export const updateCartQty = async (id, quantity) => {
  const res = await api.put(`/cart/${id}`, quantity);
  return res.status === 200 ? res : "";
};
export const deleteCartItems = async (id) => {
  const res = await api.delete(`/cart/${id}`);
  return res.status === 200 ? res : "";
};

// ==============confirm orders====================

export const cofirmOrder = async (email) => {
  const res = await api.delete(`/cart/${email}`);
};

export const fetchConfirmOrders = async () => {
  const res = await api.get(`/confirm-order`);
  return res.status === 200 ? res.data : [];
};
export const fetchConfirmOrderById = async (id) => {
  const res = await api.get(`/confirm-order-by-id/${id}`);
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
};
export const getAddressFromLocation = async (lat, lng) => {
  const res = await axios.get(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
  );
  return res.status === 200 ? res.data : [];
};
// ===============settings pai===============

export const postSettingsData = async (formData) => {
  const res = await api.put(`/settings`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.status === 200 ? res : [];
};
export const getSettingsData = async () => {
  const res = await api.get(`/settings`);
  return res.status === 200 ? res.data : [];
};

// ==========================visitors========================

export const postVisitor = async (visitor) => {
  const res = await api.post(`/visitors`, visitor);
  return res.status === 200 ? res : [];
};
export const getVisitor = async (date) => {
  const res = await api.get(`/visitors?date=${date}`);
  return res.status === 200 ? res.data : [];
};
export const getVisitorByMonth = async (year,month) => {
  const res = await api.get(`/visitors/monthly?year=${year}&month=${month}`);
  return res.status === 200 ? res.data : [];
};
export const getMonthlyConfirmOrder = async (year,month) => {
  const res = await api.get(`/monthly-confirm-order?year=${year}&month=${month}`);
  return res.status === 200 ? res.data : [];
};
export const getLiveLocation = async () => {
  const res = await api.get(`/location`);
  return res.status === 200 ? res.data : [];
};



// ========================promocode routers =======================
export const postPromocode = async (data) => {
  const res = await api.post(`/promocode`, data);
  return res.status === 200 ? res : [];
};
export const getPromocode = async () => {
  const res = await api.get(`/promocode`);
  return res.status === 200 ? res.data : [];
};
export const getPromocodeById = async (id) => {
  const res = await api.get(`/promocode/${id}`);
  return res.status === 200 ? res.data : [];
};
export const updatePromoById = async (PromoData, id) => {
  const res = await api.put(`/promocode/${id}`, PromoData);
  return res.status === 200 ? res : [];
};
export const deletePromo = async (id) => {
  const res = await api.delete(`/promocode/${id}`);
  return res.status === 200 ? res : [];
};

// ================banner api========
export const postBanner = async (bannerData) => {
  const res = await api.post(`/add-banner`, bannerData);
  return res.status === 200 ? res : [];
};
export const getBanner = async () => {
  const res = await api.get(`/all-banner`);
  return res.status === 200 ? res : [];
};
export const getBannerById = async (id) => {
  const res = await api.get(`/all-banner/${id}`);
  return res.status === 200 ? res : [];
};

export const updateBanner = async (bannerData, id) => {
  const res = await api.put(`/update-banner/${id}`, bannerData);
  return res.status === 200 ? res : [];
};
export const deleteBanner = async (id) => {
  const res = await api.delete(`/delete-banner/${id}`);
  return res.status === 200 ? res : [];
};

// =========Stripe Payment===============

export const stripePayment = async (totalAmount) => {
  const res = await api.post(`/create-payment-intent`, totalAmount);
  return res.status === 200 ? res : [];
};
export const postContact = async (data) => {
  const res = await api.post(`/contact`, data);
  return res.status === 200 ? res : [];
};
export const getEmails = async () => {
  const res = await api.get(`/emails`);
  return res.status === 200 ? res : [];
};
export const getEmailsById = async (id) => {
  const res = await api.get(`/emails/${id}`);
  return res.status === 200 ? res : [];
};
export const sendEmail = async (data) => {
  const res = await api.post(`/send-emails`, data);
  return res.status === 200 ? res : [];
};

// ===============marquee====================

export const postMarquee = async (data) => {
  const res = await api.post(`/marquee`, data);
  return res.status === 200 ? res : [];
};

export const getMarquee = async () => {
  const res = await api.get(`/marquee`);
  return res.status === 200 ? res : [];
};

export const putMarquee = async (data,editId) => {
  const res = await api.put(`/marquee/${editId}`, data);
  return res.status === 200 ? res : [];
};
export const deleteMarquee = async (id) => {
  const res = await api.delete(`/marquee/${id}`);
  return res.status === 200 ? res : [];
};

// =======================quotation====================================

export const postQuotation = async (quotation) => {
  const res = await api.post(`/quotation`, quotation);
  return res.status === 200 ? res : [];
};
export const getQuotation = async () => {
  const res = await api.get(`/quotation`);
  return res.status === 200 ? res : [];
};
export const getQuotationById = async (id) => {
  const res = await api.get(`/quotation/${id}`);
  return res.status === 200 ? res.data : [];
};
export const getAllQuotationByEmail = async (email) => {
  const res = await api.get(`/quotation-all-email/${email}`);
  return res.status === 200 ? res.data : [];
};
export const updateQuotation = async (data,id) => {
  const res = await api.put(`/quotation/${id}/product`,data);
  return res.status === 200 ? res : [];
};


// ===========offer api============

export const postOffer = async (offer) => {
  const res = await api.post(`/create-offer`, offer);
  return res.status === 200 ? res : [];
};
export const deleteOffer = async (id) => {
  const res = await api.delete(`/delete-offer/${id}`);
  return res.status === 200 ? res.data : [];
};
export const updateOffer = async (data) => {
  const res = await api.put(`/update-offer/${data.id}`, data);
  return res.status === 200 ? res.data : [];
};
export const gettOffer = async () => {
  const res = await api.get(`/all-offer`);
  return res.status === 200 ? res.data : [];
};
export const activeOffer = async () => {
  const res = await api.get(`/active-offer`);
  return res.status === 200 ? res.data : [];
};
