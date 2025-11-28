import apiClient from "./apiClient";

export const signup = async (payload) => {
  const res = await apiClient.post("/auth/register", payload);
  return res.data;
};

export const login = async (payload) => {
  const res = await apiClient.post("/auth/login", payload);
  return res.data;
};
