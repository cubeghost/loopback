import { create } from "zustand";
import { VIDEO_ASSETS, type Effect } from "../constants";

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
  id: Effect["id"] | null;
};

export type SketchInput = {
  source: SketchSource;
  effect: SketchEffect;
};

export interface SketchFeedback {
  scale: string;
  offset: string;
  threshold: string;
  intensity: string;
  audioReactive: boolean;
  audioReactiveAmount: string;
  mask: boolean;
  followCursor: boolean;
}

export type InputKey = 0 | 1;
export interface SketchState {
  inputs: {
    [K in InputKey]: SketchInput;
  };
  setInputSource: (index: InputKey, source: Partial<SketchSource>) => void;
  setInputEffect: (index: InputKey, effect: Partial<SketchEffect>) => void;

  feedback: SketchFeedback;
  setFeedback: (partial: Partial<SketchFeedback>) => void;

  blend: string;
  setBlend: (blend: string) => void;
}

export const useSketch = create<SketchState>()((set) => ({
  inputs: {
    0: {
      source: {
        type: "video",
        videoUrl: VIDEO_ASSETS.find((v) => v.id === "kermit")!.videoUrl,
      },
      effect: { id: "1" },
    },
    1: {
      source: {
        type: "video",
        videoUrl: VIDEO_ASSETS[0].videoUrl,
      },
      effect: { id: null },
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
    threshold: "0.1",
    scale: "1",
    offset: "1",
    intensity: "0.008",
    audioReactive: false,
    audioReactiveAmount: "1",
    mask: false,
    followCursor: false,
  },
  setFeedback: (partial) =>
    set((state) => ({ feedback: { ...state.feedback, ...partial } })),

  blend: "0",
  setBlend: (blend) => set({ blend }),
}));
