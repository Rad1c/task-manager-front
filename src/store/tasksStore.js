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
      set({ status: error?.response?.status });
    }
  },

  createTask: async (data) => {
    const { name, dateOn, dateOf, status, priority, description, storyId } = data;

    try {
      const response = await axiosPrivate.post(
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

      set({ status: response.status });
      get().getTasks(storyId);
    } catch (error) {
      set({ status: error?.response?.status });
    }
  },
  deleteTask: async (id) => {
    try {
      const response = await axiosPrivate.delete(`/task/${id}`);

      set({ tasks: get().tasks.filter((task) => task.id != id) });

      set({ status: response.status });
    } catch (error) {
      set({ status: error?.response?.status });
    }
  },
  updateTask: async (data) => {
    const { name, status, priority, description, id, storyId, dateOn, dateOf } = data;

    try {
      const response = await axiosPrivate.put(
        `task/${id}`,
        JSON.stringify({ name, description, priority, status, dateOn, dateOf }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const tasks = get().tasks;

      tasks.map((task) => {
        if (task.id == id) {
          task.name = name;
          task.status = status;
          task.priority = priority;
          task.description = description;
          task.dateOf = dateOf;
          task.dateOn = dateOn;

          return task;
        }
      });

      set({ tasks });
      set({ status: response?.status });
    } catch (error) {
      set({ status: error?.response?.status });
    }
  },
  updateTaskStatus: async (status, id) => {
    const tasks = get().tasks;

    const task = tasks.find((x) => x.id === id);

    tasks.map((task) => {
      if (task.id == id) {
        task.status = status;
        return task;
      }
    });

    console.log(tasks);

    set({ tasks });

    try {
      const response = await axiosPrivate.put(
        `task/${id}`,
        JSON.stringify({
          name: task.name,
          description: task.description,
          priority: task.priority,
          status: task.status,
          dateOn: task.dateOn,
          dateOf: task.dateOf,
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

export default useTaskStore;
