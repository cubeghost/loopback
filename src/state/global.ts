import { create } from "zustand";

interface GlobalState {
  videoSources: MediaDeviceInfo[];
  setVideoSources: (videoSources: MediaDeviceInfo[]) => void;
}

export const useGlobalState = create<GlobalState>()((set) => ({
  videoSources: [],
  setVideoSources: (videoSources) => set(() => ({ videoSources })),
}));
