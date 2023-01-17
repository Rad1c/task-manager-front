import create from "zustand";
import axios from "../api/axios";
import { decodeToken, isExpired } from "react-jwt";
import { calculateExpTime } from "../utils/helper";

const useLoginStore = create((set, get) => ({
  isUserLoggedIn: false,
  loginErrors: "",
  logout: () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    set({ isUserLoggedIn: false });
    set({ loginErrors: "" });
  },
  login: async (email, password) => {
    try {
      const response = await axios.post(
        "/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      localStorage.setItem("access", accessToken);
      localStorage.setItem("refresh", refreshToken);

      const { exp } = decodeToken(refreshToken);

      const loggedInDuration = calculateExpTime(exp);

      setTimeout(get().logout, loggedInDuration);
      set({ isUserLoggedIn: true });
    } catch (error) {
      set({ isUserLoggedIn: false });
      console.log(error);
      set({ loginErrors: "Login unsuccesful" });
    }
  },
  isTokenExpired: () => {
    const token = localStorage.getItem("refresh");

    return isExpired(token);
  },
}));

export default useLoginStore;
