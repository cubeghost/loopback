import { useEffect, useRef } from "react";

import { generateHydraCode } from "../code";
import { HYDRA_HEIGHT, HYDRA_WIDTH } from "../constants";
import { useSketch } from "../state/sketch";

import "./Hydra.css";

const width = HYDRA_WIDTH;
const height = HYDRA_HEIGHT;

export function Hydra() {
  const frameRef = useRef<HTMLIFrameElement>(null);

  const sketch = useSketch();

  useEffect(() => {
    if (frameRef.current) {
      frameRef.current.addEventListener("load", () => {
        frameRef.current?.contentWindow?.postMessage({
          type: "hydra",
          code: generateHydraCode(useSketch.getState()),
        });
      });
    }
  }, []);

  useEffect(() => {
    if (frameRef.current) {
      frameRef.current.contentWindow?.postMessage({
        type: "hydra",
        code: generateHydraCode(sketch),
      });
    }
  }, [sketch]);

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
