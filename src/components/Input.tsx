import type { ChangeEvent } from "react";
import { useShallow } from "zustand/react/shallow";

import { useSoundEffects } from "../hooks/useSoundEffects";
import { useSketch, type InputKey } from "../state/sketch";
import { Effect } from "./Effect";
import { Source } from "./Source";

import "./Input.css";

interface InputProps {
  index: InputKey;
}

export function Input({ index }: InputProps) {
  const { input, setSource, setEffect, isActive } = useSketch(
    useShallow((state) => {
      const blend = parseFloat(state.blend);
      return {
        input: state.inputs[index],
        setSource: state.setInputSource,
        setEffect: state.setInputEffect,
        isActive: Number.isInteger(blend) === false || blend === index,
        setFeedback: state.setFeedback,
      };
    }),
  );

  return (
    <>
      <div
        className={`input-panel input-panel-${index}`}
        style={
          {
            "--grid-area": `input-panel-${index}`,
            alignItems: index === 0 ? "flex-end" : "flex-start",
          } as React.CSSProperties
        }
      >
        <Source source={input.source} setSource={(source) => setSource(index, source)} />
        <Effect
          index={index}
          effect={input.effect}
          setEffect={(effect) => setEffect(index, effect)}
        />
      </div>
    </>
  );
}
