import { useShallow } from "zustand/react/shallow";

import { Source } from "./Source";

import "./Input.css";
import { useSketch } from "../state/sketch";
import { Effect } from "./Effect";

interface InputProps {
  index: number;
}

export function Input({ index }: InputProps) {
  const { input, setSource, setEffect } = useSketch(
    useShallow((state) => ({
      input: state.inputs[index],
      setSource: state.setInputSource,
      setEffect: state.setInputEffect,
    })),
  );

  return (
    <>
      <div
        className="input-panel"
        style={{ "--grid-area": `input-panel-${index}` }}
      >
        <Source
          source={input.source}
          setSource={(source) => setSource(index, source)}
        />
        <Effect
          effect={input.effect}
          setEffect={(effect) => setEffect(index, effect)}
        />
      </div>
      <div
        className="input-connect"
        style={{ "--grid-area": `input-connect-${index}` }}
      ></div>
    </>
  );
}
