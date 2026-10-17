import type { ChangeEvent } from "react";
import { useShallow } from "zustand/react/shallow";

import { useSketch, type InputKey } from "../state/sketch";
import { useSoundEffects } from "../useSoundEffects";
import { Effect } from "./Effect";
import { Source } from "./Source";

import "./Input.css";

interface InputProps {
  index: InputKey;
}

export function Input({ index }: InputProps) {
  const [play] = useSoundEffects("click");
  const { input, isActive, setSource, setEffect, setFeedback } = useSketch(
    useShallow((state) => ({
      input: state.inputs[index],
      setSource: state.setInputSource,
      setEffect: state.setInputEffect,
      isActive: state.feedback.input === index,
      setFeedback: state.setFeedback,
    })),
  );

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setFeedback({ input: parseInt(event.target.value) });
    play();
  }

  return (
    <>
      <div
        className={`input-panel input-panel-${index}`}
        style={{
          "--grid-area": `input-panel-${index}`,
          alignItems: index === 0 ? "flex-end" : "flex-start",
        }}
      >
        <Source source={input.source} setSource={(source) => setSource(index, source)} />
        <Effect
          index={index}
          effect={input.effect}
          setEffect={(effect) => setEffect(index, effect)}
        />
      </div>
      {/* <div
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
            onChange={handleInputChange}
          />
        </label>
      </div> */}
    </>
  );
}
