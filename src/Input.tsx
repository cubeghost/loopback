import { useShallow } from "zustand/react/shallow";

import { Source } from "./Source";

import "./Input.css";
import { useSketch } from "./state/sketch";

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
    <div className="input-panel" style={{ "--grid-area": `input${index}` }}>
      <Source
        source={input.source}
        setSource={(source) => setSource(index, source)}
        index={index}
        key={`source-${index}`}
      />
      <fieldset>
        <legend>Effect</legend>
        <input
          type="checkbox"
          checked={!!input.effect.enabled}
          onChange={(e) => setEffect(index, { enabled: e.target.checked })}
        />
      </fieldset>
    </div>
  );
}
