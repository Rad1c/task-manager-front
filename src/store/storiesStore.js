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
      set({ status: 401 });
    }
  },
  getTasksByStoryId: async (id) => {
    const response = await axiosPrivate.get(`/task/story/${id}`);

    return response.data;
  },
  deleteStory: async (id) => {
    try {
      const response = await axiosPrivate.delete(`/story/${id}`);

      set({ stories: get().stories.filter((story) => story.id != id) });

      set({ status: response.status });
    } catch (error) {
      //set({ status: { value: 400, trigger: !status.trigger } });
      set({ status: 400 });
    }
  },
  createStory: async (data) => {
    const { name, status, priority, description } = data;

    try {
      await axiosPrivate.post(
        "story",
        JSON.stringify({ name, status, priority, description }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      get().getStories();
    } catch (error) {
      set({ status: 400 });
    }
  },
  updateStory: async (data) => {
    const { name, status, priority, description, id } = data;

    try {
      await axiosPrivate.put(
        `story/${id}`,
        JSON.stringify({ name, description, priority, status }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      get().getStories();
    } catch (error) {
      set({ status: 400 });
    }
  },
}));

export default useStoriesStore;
