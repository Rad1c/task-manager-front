import { useState } from "react";
import create from "zustand";

const useLoginStore = create((set) => ({
  email: "",
  password: "",
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
}));

export default useLoginStore;
