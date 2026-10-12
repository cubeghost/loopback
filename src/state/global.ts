import { create } from "zustand";

interface GlobalState {
  webcams: MediaDeviceInfo[];
  setWebcams: (webcams: MediaDeviceInfo[]) => void;
}

export const useGlobalState = create<GlobalState>()((set) => ({
  webcams: [],
  setWebcams: (webcams) => set(() => ({ webcams })),
}));
