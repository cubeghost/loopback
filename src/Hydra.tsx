import { useEffect, useRef } from "react";
import REGL from "regl";
import {
  createMouse,
  detectPrecision,
  Hydra as HydraLib,
  type Mouse,
} from "hydra-ts";
import { useSketch } from "./state/sketch";

const width = 512;
const height = 512;

export function Hydra(props) {
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
    Object.values(sketch.inputs).forEach((input, index) => {
      if (input.source.type === "webcam") {
        sources[index].initCam(input.source.webcamIndex ?? undefined);
        console.log(sources[index]);
      }
    });

    const [s0, s1, s2, s3] = sources;
    const [o0, o1, o2, o3] = outputs;
    const { loop, render } = hydra;

    loop.start();

    // https://hydra.ojack.xyz/?sketch_id=example_14
    // osc(20, 0.01, 1.1)
    //   .kaleid(5)
    //   .color(2.83, 0.91, 0.39)
    // src(s0)
    //   // .rotate(0, 0.1)
    //   .modulate(o0, () => x() * 0.4)
    //   .scale(1.01)
    //   .out(o0);

    // FEEDBACK SPECIAL SAUCE
    // src(s0).scale(0.5).out(o1);
    // src(o0)
    //   .layer(src(o1).luma(0.1, 1e-6))
    //   .modulateScale(src(o0).scale(1.01), 1)
    //   .out();

    Object.values(sketch.inputs).forEach((input, index) => {
      let source = src(sources[index]);
      if (input.effect) {
        source = source.mult(osc(20, -0.1, 1).rotate(Math.PI * 0.5));
      }
      source.scale(0.5).out(outputs[index]);
    });

    src(o3)
      .layer(src(outputs[sketch.feedback.mainSource]).luma(0.1, 1e-6))
      .modulateScale(
        src(
          sketch.feedback.modulateSource !== "self"
            ? outputs[sketch.feedback.modulateSource]
            : o3,
        ).scale(1.01),
        1,
      )
      .out(o3);

    render(o3);

    // voronoi(8, 1)
    //   .mult(
    //     osc(10, 0.1, ({ time }) => Math.sin(time) * 3)
    //       .saturate(3)
    //       .kaleid(200),
    //   )
    //   .modulate(o0, 0.5)
    //   .add(o0, 0.8)
    //   .scrollY(-0.01)
    //   .scale(0.99)
    //   .modulate(voronoi(8, 1), 0.008)
    //   .luma(0.3)
    //   .out();

    // hydra.synth.speed = 0.1;
  }

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
        width: 512,
        height: 512,
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
    <canvas ref={canvasRef} width={512} height={512} style={{ width: 512 }} />
  );
}
