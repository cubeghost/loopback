import { useShallow } from "zustand/react/shallow";

import { Source } from "./Source";

import "./Input.css";
import { useSketch } from "../state/sketch";
import { Effect } from "./Effect";

interface InputProps {
  index: number;
}

export function Input({ index }: InputProps) {
  const { input, isActive, setSource, setEffect, setFeedback } = useSketch(
    useShallow((state) => ({
      input: state.inputs[index],
      setSource: state.setInputSource,
      setEffect: state.setInputEffect,
      isActive: state.feedback.input === index,
      setFeedback: state.setFeedback,
    })),
  );

  return (
    <>
      <div
        className={`input-panel input-panel-${index}`}
        style={{
          "--grid-area": `input-panel-${index}`,
          alignItems: index === 0 ? "flex-end" : "flex-start",
        }}
      >
        <Source
          source={input.source}
          setSource={(source) => setSource(index, source)}
        />
        <Effect
          index={index}
          effect={input.effect}
          setEffect={(effect) => setEffect(index, effect)}
        />
      </div>
      <div
        className={`input-connect input-connect-${index}`}
        style={{ "--grid-area": `input-connect-${index}` }}
      >
        <label>
          <span>Input {index}</span>
          <input
            type="radio"
            id={`input-${index}`}
            name="mixer-input"
            value={index}
            checked={isActive}
            onChange={(e) => setFeedback({ input: parseInt(e.target.value) })}
          />
        </label>
      </div>
    </>
  );
}
