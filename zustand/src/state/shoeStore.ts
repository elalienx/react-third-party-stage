// Node module
import { create } from "zustand";

// Project files
import { User } from "../types/types";

type State = {
  user: User | null;
};

type Action = {
  login: (user: User) => void;
  logout: () => void;
};

const useShoeStore = create<State & Action>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useShoeStore;
