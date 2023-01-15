import { axiosPrivate } from "../api/axios";
import create from "zustand";
import { useEffect } from "react";

const useStoriesStore = create((set, get) => ({
  stories: [],
  status: "",
  getStories: async () => {
    try {
      const response = await axiosPrivate.get("/stories");

      set({ stories: response.data });
      set({ status: response.status });
    } catch (error) {
      set({ status: 400 });
      console.log(error);
    }
  },
  deleteStory: async (id) => {
    try {
      const response = await axiosPrivate.delete(`/story/${id}`);
      set({ stories: get().stories.filter((story) => story.id != id) });

      set({ status: response.status });
    } catch (error) {
      set({ status: 400 });
      console.log(error);
    }
  },
}));

export default useStoriesStore;
