import create from "zustand";
import { axiosPrivate } from "../api/axios";

const useTaskStore = create((set) => ({
  tasks: [],
  storyName: "",
  status: "",
  getTasks: async (id) => {
    try {
      const response = await axiosPrivate.get(`/task/story/${id}`);

      set({ tasks: response.data.tasks });
      set({ storyName: response.data.storyName });
      set({ status: response.status });
    } catch (error) {
      set({ status: 400 });
      console.log(error);
    }
  },
}));

export default useTaskStore;
