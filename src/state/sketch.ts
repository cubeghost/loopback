import { create } from "zustand";

export type SketchSource =
  | {
      type: "camera";
      cameraIndex: number | string;
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
  camera: { cameraIndex: 0 },
  video: { videoUrl: "" },
  screen: {},
  noise: { noiseScale: "5", noiseSpeed: "0.5" },
};

export type SketchEffect = {
  enabled: boolean;
};

export type SketchInput = {
  source: SketchSource;
  effect: SketchEffect;
};

export interface SketchFeedback {
  source: number;
  scale: string;
  offset: string;
  threshold: string;
  intensity: string;
}

export interface SketchAudioReactive {
  enabled: boolean;
  amount: string;
}

export interface SketchState {
  inputs: Record<number, SketchInput>;
  setInputSource: (index: number, source: Partial<SketchSource>) => void;
  setInputEffect: (index: number, effect: Partial<SketchEffect>) => void;

  feedback: SketchFeedback;
  setFeedback: (partial: Partial<SketchFeedback>) => void;

  audioReactive: SketchAudioReactive;
  setAudioReactive: (partial: Partial<SketchAudioReactive>) => void;
}

export const useSketch = create<SketchState>()((set) => ({
  inputs: {
    0: {
      source: { type: "camera", cameraIndex: 1 },
      effect: { enabled: false },
    },
    1: {
      source: {
        type: "video",
        videoUrl:
          "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDI0cGUxdWY5M2hneDJrdjNleWxoenEwenI2cHYzeDc3bHBmdjFlcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5xtDarpJpIPHFGJrRrG/giphy.mp4",
      },
      effect: { enabled: false },
    },
  },
  setInputSource: (index, source) =>
    set((state) => {
      const currentSource = state.inputs[index].source;
      const sourceDefaults =
        source.type && source.type !== currentSource.type
          ? DEFAULT_SOURCE_VALUES[source.type]
          : {};
      return {
        inputs: {
          ...state.inputs,
          [index]: {
            source: {
              ...sourceDefaults,
              ...state.inputs[index].source,
              ...source,
            } as SketchSource, // we merge properties from other source types as a way of saving previous state
            effect: state.inputs[index].effect,
          },
        },
      };
    }),
  setInputEffect: (index, effect) =>
    set((state) => ({
      inputs: {
        ...state.inputs,
        [index]: {
          source: state.inputs[index].source,
          effect: { ...state.inputs[index].effect, ...effect },
        },
      },
    })),

  feedback: {
    source: 0,
    threshold: "0.1",
    scale: "1",
    offset: "1",
    intensity: "0.008",
  },
  setFeedback: (partial) =>
    set((state) => ({ feedback: { ...state.feedback, ...partial } })),

  audioReactive: {
    enabled: true,
    amount: "1",
  },
  setAudioReactive: (partial) =>
    set((state) => ({ audioReactive: { ...state.audioReactive, ...partial } })),
}));
