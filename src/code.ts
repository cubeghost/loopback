import { EFFECTS } from "./constants";
import type {
  InputKey,
  SketchEffect,
  SketchInput,
  SketchSource,
  SketchState,
} from "./state/sketch";
import { typedFromEntries, typedObjectKeys } from "./utils";

export const notFalse = (line: string | boolean) => line !== false;

const MOUSE_POSITIONS = [
  "x = () => (-mouse.x/width)+.5",
  "y = () => (-mouse.y/height)+.5",
].join("\n");

const EFFECTS_MAP = new Map(EFFECTS.map((effect) => [effect.id, effect.code]));

function generateHydraFeedbackCode(
  o: string,
  feedback: SketchState["feedback"],
) {
  const {
    threshold,
    intensity,
    scale,
    offset,
    audioReactive,
    audioReactiveAmount,
    mask,
    followCursor,
  } = feedback;

  const scaleValue = audioReactive
    ? `() => (${scale} + a.fft[0] * ${audioReactiveAmount})`
    : `${scale}`;

  const maskTransform = mask
    ? `.mask(shape(24,0.4,0)${followCursor ? ".scroll(()=>-x(),()=>-y())" : ""})`
    : false;

  return [
    `src(${o})`,
    `  .layer(`,
    `    src(o2)`,
    maskTransform,
    `      .luma(${threshold},1e-6)`,
    followCursor ? `.scroll(()=>x(),()=>y())` : false,
    `  )`,
    `  .modulateScale(src(${o}).scale(1 + ${intensity}),${scaleValue},${offset})`,
    `  .out(${o})`,
  ]
    .filter(notFalse)
    .join("\n");
}

// merge source and effect dicts
type SketchInputs = {
  [K in InputKey]: { source: SketchSource; effect: SketchEffect };
};
function mergeInputs(sketch: SketchState): SketchInputs {
  return typedFromEntries(
    typedObjectKeys(sketch.sources).map((key) => [
      key,
      {
        source: sketch.sources[key],
        effect: sketch.effects[key],
      },
    ]),
  );
}

export function generateHydraRender(sketch: SketchState) {
  const o = "o3";
  const inputs = mergeInputs(sketch);
  const code = [
    sketch.feedback.followCursor ? MOUSE_POSITIONS : false,
    ...Object.values(inputs).map((input, index) => {
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
      if (input.effect.id && EFFECTS_MAP.has(input.effect.id)) {
        source += EFFECTS_MAP.get(input.effect.id);
      }
      source += `.scale(0.5).out(o${index})`;
      return source;
    }),
    `src(o0).blend(o1,${sketch.blend}).out(o2)`,
    "",
    generateHydraFeedbackCode(o, sketch.feedback),
    "",
    `render(${o})`,
  ];

  return code.filter(notFalse).join("\n");
}

export function generateHydraInitializer(
  index: InputKey,
  source: SketchSource,
) {
  switch (source.type) {
    case "camera":
      return `s${index}.initCam(${source.cameraIndex ?? ""})`;
    case "video":
      return `s${index}.initVideo("${source.videoUrl ?? ""}")`;
    case "screen":
      return `s${index}.initScreen()`;
    default:
      return false;
  }
}

export function generateHydraInitializers(sketch: SketchState) {
  return Object.values(sketch.sources)
    .map((source, index) => generateHydraInitializer(index as InputKey, source))
    .filter(notFalse)
    .join("\n");
}

export function generateHydraCode(sketch: SketchState) {
  return [generateHydraInitializers(sketch), generateHydraRender(sketch)]
    .filter(notFalse)
    .join("\n\n");
}
