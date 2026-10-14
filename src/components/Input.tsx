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
      >
        <label>
          <span className="visually-hidden">Input {index}</span>
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
