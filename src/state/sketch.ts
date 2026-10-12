import { create } from "zustand";

export type SketchSource = {
  type: "webcam";
  webcamIndex: number | string;
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
    0: { source: { type: "webcam", webcamIndex: 1 }, effect: true },
    1: { source: { type: "webcam", webcamIndex: 1 }, effect: false },
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
