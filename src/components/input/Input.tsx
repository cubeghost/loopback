import { useShallow } from "zustand/react/shallow";

import { useSketch, type InputKey } from "../../state/sketch";
import { InputEffect } from "./InputEffect";
import { InputSource } from "./InputSource";

import "./Input.css";

interface InputProps {
  index: InputKey;
}

export function Input({ index }: InputProps) {
  const { source, effect, setSource, setEffect, isActive } = useSketch(
    useShallow((state) => {
      const blend = parseFloat(state.blend);
      return {
        source: state.sources[index],
        effect: state.effects[index],
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
        <InputSource source={source} setSource={(source) => setSource(index, source)} />
        <InputEffect
          index={index}
          effect={effect}
          setEffect={(effect) => setEffect(index, effect)}
        />
      </div>
    </>
  );
}
