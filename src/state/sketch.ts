import { create } from "zustand";
import { VIDEO_ASSETS, type Effect } from "../constants";

export type SketchSource =
  | {
      type: "camera";
      cameraIndex: number | string | null;
    }
  | {
      type: "video";
      videoUrl: string;
    }
  | {
      type: "screen";
    }
  | { type: "noise"; noiseScale: string; noiseSpeed: string };

const DEFAULT_SOURCE_VALUES: {
  [K in SketchSource["type"]]: Omit<Extract<SketchSource, { type: K }>, "type">;
} = {
  camera: { cameraIndex: "" },
  video: { videoUrl: "" },
  screen: {},
  noise: { noiseScale: "1", noiseSpeed: "0.5" },
};

export type SketchEffect = {
  id: Effect["id"] | null;
};

export interface SketchFeedback {
  scale: number;
  offset: number;
  threshold: number;
  intensity: number;
  audioReactive: boolean;
  audioReactiveAmount: number;
  mask: boolean;
  followCursor: boolean;
}

export type InputKey = 0 | 1;

export interface SketchState {
  sources: {
    [K in InputKey]: SketchSource;
  };
  setInputSource: (index: InputKey, source: Partial<SketchSource>) => void;

  effects: {
    [K in InputKey]: SketchEffect;
  };
  setInputEffect: (index: InputKey, effect: Partial<SketchEffect>) => void;

  feedback: SketchFeedback;
  setFeedback: (partial: Partial<SketchFeedback>) => void;

  blend: string;
  setBlend: (blend: string) => void;
}

export const useSketch = create<SketchState>()((set) => ({
  sources: {
    0: {
      type: "video",
      videoUrl: VIDEO_ASSETS.find((v) => v.id === "wiki")!.videoUrl,
    },
    1: {
      type: "video",
      videoUrl: VIDEO_ASSETS[0].videoUrl,
    },
  },
  setInputSource: (index, source) =>
    set((state) => {
      const currentSource = state.sources[index];
      const sourceDefaults =
        source.type && source.type !== currentSource.type
          ? DEFAULT_SOURCE_VALUES[source.type]
          : {};
      return {
        sources: {
          ...state.sources,
          [index]: {
            ...sourceDefaults,
            ...currentSource,
            ...source,
          } as SketchSource, // we merge properties from other source types as a way of saving previous state
        },
      };
    }),

  effects: {
    0: {
      id: "1",
    },
    1: {
      id: null,
    },
  },
  setInputEffect: (index, effect) =>
    set((state) => ({
      effects: {
        ...state.effects,
        [index]: {
          ...state.effects[index],
          ...effect,
        },
      },
    })),

  feedback: {
    threshold: 0.1,
    scale: 1,
    offset: 1,
    intensity: 0.01,
    audioReactive: false,
    audioReactiveAmount: 1,
    mask: false,
    followCursor: false,
  },
  setFeedback: (partial) =>
    set((state) => ({ feedback: { ...state.feedback, ...partial } })),

  blend: "0",
  setBlend: (blend) => set({ blend }),
}));
