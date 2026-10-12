import { create } from "zustand";

export type SketchSource =
  | {
      type: "webcam";
      webcamIndex: number | string;
    }
  | {
      type: "video";
      url: string;
    }
  | {
      type: "screen";
    };

export type SketchEffect = {};

export type SketchInput = {
  source: SketchSource;
  effect: SketchEffect | boolean;
};

export interface SketchFeedback {
  mainSource: number;
  modulateSource: number | "self"; // null = self
  // luma
}

export interface SketchState {
  inputs: Record<number, SketchInput>;
  setInputSource: (index: number, source: SketchSource) => void;
  setInputEffect: (index: number, effect: SketchEffect | false) => void;

  feedback: SketchFeedback;
  setFeedback: (partial: Partial<SketchFeedback>) => void;
}

export const useSketch = create<SketchState>()((set) => ({
  inputs: {
    0: { source: { type: "webcam", webcamIndex: 1 }, effect: false },
    1: {
      source: {
        type: "video",
        url: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDI0cGUxdWY5M2hneDJrdjNleWxoenEwenI2cHYzeDc3bHBmdjFlcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5xtDarpJpIPHFGJrRrG/giphy.mp4",
      },
      effect: false,
    },
  },
  setInputSource: (index, source) =>
    set((state) => ({
      inputs: {
        ...state.inputs,
        [index]: {
          source,
          effect: state.inputs[index].effect,
        },
      },
    })),
  setInputEffect: (index, effect) =>
    set((state) => ({
      inputs: {
        ...state.inputs,
        [index]: {
          source: state.inputs[index].source,
          effect,
        },
      },
    })),

  feedback: {
    mainSource: 0,
    modulateSource: "self",
  },
  setFeedback: (partial) =>
    set((state) => ({ feedback: { ...state.feedback, ...partial } })),
}));
