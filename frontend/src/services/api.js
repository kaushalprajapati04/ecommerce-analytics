import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

export const getDashboardSummary = async () => {
  const response = await API.get("/dashboard/summary");
  return response.data;
};

export const getCustomers = async (search = "") => {
  const response = await API.get("/customers", {
    params: search ? { search } : {},
  });
  return response.data;
};

export const getProducts = async (search = "") => {
  const response = await API.get("/products", {
    params: search ? { search } : {},
  });
  return response.data;
};

export const getOrders = async (search = "") => {
  const response = await API.get("/orders", {
    params: search ? { search } : {},
  });
  return response.data;
};

export const getAnalyticsSummary = async () => {
  const response = await API.get("/analytics/summary");
  return response.data;
};

export default API;