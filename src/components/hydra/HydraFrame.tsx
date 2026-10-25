import { useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";

import { generateHydraCode, generateHydraInitializer, generateHydraRender } from "../../code";
import { HYDRA_HEIGHT, HYDRA_WIDTH } from "../../constants";
import { useSketch } from "../../state/sketch";

import "./HydraFrame.css";

const width = HYDRA_WIDTH;
const height = HYDRA_HEIGHT;

interface HydraProps {
  enableAudio: boolean;
}

export function Hydra({ enableAudio }: HydraProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const enableAudioRef = useRef(enableAudio);
  useEffect(() => {
    enableAudioRef.current = enableAudio;
  }, [enableAudio]);

  const source0 = useSketch(useShallow((state) => state.sources[0]));
  const source1 = useSketch(useShallow((state) => state.sources[1]));
  const sketch = useSketch(
    useShallow((state) => {
      const { sources: _, ...rest } = state;
      return rest;
    }),
  );

  useEffect(() => {
    if (frameRef.current) {
      frameRef.current.addEventListener("load", () => {
        frameRef.current?.contentWindow?.postMessage({
          type: "hydra:start",
          code: generateHydraCode(useSketch.getState()),
          detectAudio: enableAudioRef.current,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (frameRef.current) {
      frameRef.current.contentWindow?.postMessage({
        type: "hydra:render",
        code: generateHydraRender(useSketch.getState()),
        detectAudio: enableAudio,
      });
    }
  }, [sketch, enableAudio]);

  useEffect(() => {
    if (frameRef.current) {
      frameRef.current.contentWindow?.postMessage({
        type: "hydra:init",
        init: generateHydraInitializer(0, source0),
        code: generateHydraRender(useSketch.getState()),
      });
    }
  }, [source0]);

  useEffect(() => {
    if (frameRef.current) {
      frameRef.current.contentWindow?.postMessage({
        type: "hydra:init",
        init: generateHydraInitializer(1, source1),
        code: generateHydraRender(useSketch.getState()),
      });
    }
  }, [source1]);

  return (
    <div className="hydra">
      <div className="hydra-frame" />
      <iframe
        src={`${window.location.origin}/frame.html`}
        sandbox="allow-scripts allow-same-origin"
        allow="microphone; camera; display-capture"
        width={width}
        height={height}
        ref={frameRef}
      ></iframe>
    </div>
  );
}
