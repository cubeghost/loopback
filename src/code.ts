import type { SketchState } from "./state/sketch";

const notFalse = (line) => line !== false;

const MOUSE_POSITIONS = [
  "x = () => (-mouse.x/width)+.5",
  "y = () => (-mouse.y/height)+.5",
].join("\n");

function generateHydraFeedbackCode(o: string, sketch: SketchState) {
  const {
    feedback: { input, threshold, intensity, scale, offset },
    audioReactive,
    mouseReactive,
  } = sketch;

  const scaleValue = audioReactive.enabled
    ? `() => (${scale} + a.fft[0] * ${audioReactive.amount})`
    : `${scale}`;

  return [
    `src(${o})`,
    `    .layer(`,
    `        src(o${input})`,
    `            .luma(${threshold},1e-6)`,
    mouseReactive.enabled ? `            .scroll(()=>x(),()=>y())` : false,
    `    )`,
    `    .modulateScale(src(${o}).scale(1 + ${intensity}),${scaleValue},${offset})`,
    `    .out(${o})`,
  ]
    .filter(notFalse)
    .join("\n");
}

export function generateHydraCode(sketch: SketchState) {
  const o = "o3";
  const code = [
    sketch.mouseReactive.enabled ? MOUSE_POSITIONS : false,
    ...Object.values(sketch.inputs).map((input, index) => {
      switch (input.source.type) {
        case "camera":
          return `s${index}.initCam(${input.source.cameraIndex ?? ""})`;
        case "video":
          return `s${index}.initVideo("${input.source.videoUrl ?? ""}")`;
        case "screen":
          return `s${index}.initScreen()`;
        default:
          return false;
      }
    }),
    "",
    ...Object.values(sketch.inputs).map((input, index) => {
      let source = (() => {
        switch (input.source.type) {
          case "camera":
          case "video":
          case "screen":
            return `src(s${index})`;
          case "noise":
            return `noise(${input.source.noiseScale}, ${input.source.noiseSpeed})`;
        }
      })();
      if (input.effect.enabled) {
        source += `.mult(osc(20, -0.1, 1).rotate(Math.PI * 0.5))`;
      }
      source += `.scale(0.5).out(o${index})`;
      return source;
    }),
    "",
    generateHydraFeedbackCode(o, sketch),
    "",
    `render(${o})`,
  ];

  return code.filter(notFalse).join("\n");
}
