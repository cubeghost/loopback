import { useEffect, useRef } from "react";
import REGL from "regl";
import {
  createMouse,
  detectPrecision,
  Hydra as HydraLib,
  type Mouse,
} from "hydra-ts";
import { useSketch, type SketchState } from "./state/sketch";
import "./Hydra.css";

const width = 512;
const height = 512;

function generateHydraCode(sketch: Pick<SketchState, "inputs" | "feedback">) {
  const code: string[] = [];

  Object.values(sketch.inputs).forEach((input, index) => {
    switch (input.source.type) {
      case "webcam":
        code.push(`s${index}.initCam(${input.source.webcamIndex ?? ""})`);
        return;
      case "video":
        code.push(`s${index}.initVideo(${input.source.url ?? ""})`);
        return;
      case "screen":
        code.push(`s${index}.initScreen()`);
    }
  });

  return code.join("\n");
}

export function Hydra() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hydraRef = useRef<InstanceType<typeof HydraLib>>(null);
  const mouseRef = useRef<Mouse>(null);

  const sketch = useSketch();

  function runHydra() {
    if (!canvasRef.current || !hydraRef.current || !mouseRef.current) return;
    console.log("runHydra");
    const { top, left } = canvasRef.current.getBoundingClientRect();
    const hydra = hydraRef.current;
    const mouse = mouseRef.current;
    const x = () => -(mouse.x - left) / width + 0.5;
    const y = () => -(mouse.y - top) / height + 0.5;

    const { src, osc, gradient, shape, voronoi, noise, solid, prev } =
      hydra.generators;
    const { sources, outputs, hush } = hydra;

    hush();

    const output = outputs[3];
    Object.values(sketch.inputs).forEach((input, index) => {
      switch (input.source.type) {
        case "webcam":
          sources[index].initCam(input.source.webcamIndex ?? undefined);
          return;
        case "video":
          sources[index].initVideo(input.source.url);
          return;
        case "screen":
          sources[index].initScreen();
          return;
        default:
          return;
      }
    });

    const { loop, render } = hydra;

    loop.start();

    Object.values(sketch.inputs).forEach((input, index) => {
      let source = src(sources[index]);
      if (input.effect) {
        source = source.mult(osc(20, -0.1, 1).rotate(Math.PI * 0.5));
      }
      source.scale(0.5).out(outputs[index]);
    });

    src(output)
      .layer(src(outputs[sketch.feedback.mainSource]).luma(0.1, 1e-6))
      .modulateScale(
        src(
          sketch.feedback.modulateSource !== "self"
            ? outputs[sketch.feedback.modulateSource]
            : output,
        ).scale(1.01),
        1,
      )
      .out(output);

    render(output);
  }

  const hydraCode = generateHydraCode(sketch);

  useEffect(() => {
    runHydra();
  }, [sketch]);

  useEffect(() => {
    if (canvasRef.current && !mouseRef.current) {
      const mouse = createMouse(canvasRef.current);
      mouseRef.current = mouse;
    }
  });

  useEffect(() => {
    if (canvasRef.current && !hydraRef.current) {
      const regl = REGL({
        canvas: canvasRef.current,
        attributes: {
          antialias: true,
          preserveDrawingBuffer: true,
        },
      });
      const hydra = new HydraLib({
        regl,
        width,
        height,
        precision: detectPrecision(),
      });
      hydraRef.current = hydra;

      runHydra();

      return () => {
        // mouse.enabled = false;
      };
    }
  }, []);

  return (
    <div className="hydra">
      <canvas ref={canvasRef} width={width} height={height} style={{ width }} />
      {/* <div style={{ maxWidth: width, overflow: "scroll" }}>
        <code>
          <pre>{hydraCode}</pre>
        </code>
      </div> */}
    </div>
  );
}
