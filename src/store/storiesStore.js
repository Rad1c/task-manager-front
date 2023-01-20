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
      set({ status: error?.response?.status });
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
      set({ status: error?.response?.status });
    }
  },
  createStory: async (data) => {
    const { name, status, priority, description } = data;

    try {
      const response = await axiosPrivate.post(
        "story",
        JSON.stringify({ name, status, priority, description }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      set({ status: response.status });

      get().getStories();
      set({ status: response?.status });
    } catch (error) {
      set({ status: error?.response?.status });
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

      const stories = get().stories;

      stories.map((story) => {
        if (story.id === id) {
          story.name = name;
          story.status = status;
          story.priority = priority;
          story.description = description;
          return story;
        }
      });

      set({ stories });
      set({ status: response?.status });
    } catch (error) {
      set({ status: error?.response?.status });
    }
  },
  updateStoryStatus: async (status, id) => {
    const stories = get().stories;

    const story = stories.find((x) => x.id === id);

    stories.map((story) => {
      if (story.id == id) {
        story.status = status;
        return story;
      }
    });

    set({ stories });

    try {
      const response = await axiosPrivate.put(
        `story/${id}`,
        JSON.stringify({
          name: story.name,
          description: story.description,
          priority: story.priority,
          status: story.status,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      set({ status: response?.status });
    } catch (error) {
      set({ status: error?.response?.status });
    }
  },
}));

export default useStoriesStore;
