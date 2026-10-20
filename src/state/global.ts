import { create } from "zustand";

interface GlobalState {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const useGlobalState = create<GlobalState>()((set) => ({
  soundEnabled: true,
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
}));
