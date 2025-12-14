import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../config/axiosClient";

export const register = createAsyncThunk(
  "user/register",
  async (body, thunkAPI) => {
    try {
      return await axiosClient.post("auth/register", body).then(async () => {
        return await loginHandling({
          email: body.email,
          password: body.password,
        });
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

const loginHandling = async (values) => {
  const res = await axiosClient.post("auth/login", {
    email: values.email,
    password: values.password,
  });
  const user = {
    ...res.data.user,
    role: window.location.pathname.includes("dashboard")
      ? res.data.user.email.toLowerCase().includes("instructor")
        ? "instructor"
        : "admin"
      : "student",
  };
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(user));
  return { token: res.data.token, user: user };
};

export const login = createAsyncThunk("user/login", async (body, thunkAPI) => {
  try {
    return await loginHandling(body);
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Registration failed"
    );
  }
});
