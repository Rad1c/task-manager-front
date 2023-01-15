import create from "zustand";

const useLoginStore = create((set) => ({
  isUserLoggedIn: false,
  setIsUserLoggedIn: (status) => set({ isUserLoggedIn: status }),
}));

export default useLoginStore;
