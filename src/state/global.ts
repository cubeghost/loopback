import { create } from "zustand";

interface GlobalState {
  videoSources: MediaDeviceInfo[];
  setVideoSources: (videoSources: MediaDeviceInfo[]) => void;

  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const useGlobalState = create<GlobalState>()((set) => ({
  videoSources: [],
  setVideoSources: (videoSources) => set({ videoSources }),

  soundEnabled: true,
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
}));
