import create from "zustand";
import { axiosPrivate } from "../api/axios";

const useTaskStore = create((set, get) => ({
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

  createTask: async (data) => {
    const { name, dateOn, dateOf, status, priority, description, storyId } =
      data;

    try {
      await axiosPrivate.post(
        "task",
        JSON.stringify({
          name,
          status,
          priority,
          description,
          dateOf,
          dateOn,
          storyId,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      get().getTasks(storyId);
    } catch (error) {
      set({ status: 400 });
    }
  },
  deleteTask: async (id) => {
    try {
      const response = await axiosPrivate.delete(`/task/${id}`);

      set({ tasks: get().tasks.filter((task) => task.id != id) });

      set({ status: response.status });
    } catch (error) {
      //set({ status: { value: 400, trigger: !status.trigger } });
      set({ status: 400 });
    }
  },
  updateTask: async (data) => {
    const { name, status, priority, description, id, storyId, dateOn, dateOf } =
      data;

    try {
      await axiosPrivate.put(
        `task/${id}`,
        JSON.stringify({ name, description, priority, status, dateOn, dateOf }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      get().getTasks(storyId);
    } catch (error) {
      set({ status: 400 });
    }
  },
}));

export default useTaskStore;
