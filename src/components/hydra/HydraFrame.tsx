import { useEffect, useRef } from "react";

import { generateHydraCode } from "../../code";
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

  const sketch = useSketch();

  useEffect(() => {
    if (frameRef.current) {
      frameRef.current.addEventListener("load", () => {
        frameRef.current?.contentWindow?.postMessage({
          type: "hydra",
          code: generateHydraCode(useSketch.getState()),
          detectAudio: enableAudioRef.current,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (frameRef.current) {
      frameRef.current.contentWindow?.postMessage({
        type: "hydra",
        code: generateHydraCode(sketch),
        detectAudio: enableAudio,
      });
    }
  }, [sketch, enableAudio]);

  return (
    <div className="hydra">
      <iframe
        src={`${window.location.origin}/frame.html`}
        sandbox="allow-scripts allow-same-origin"
        allow="microphone; camera"
        width={width}
        height={height}
        ref={frameRef}
      ></iframe>
    </div>
  );
}
