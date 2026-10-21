import { useShallow } from "zustand/react/shallow";

import { useSketch, type InputKey } from "../../state/sketch";
import { InputEffect } from "./InputEffect";
import { InputSource } from "./InputSource";

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
        <InputSource source={input.source} setSource={(source) => setSource(index, source)} />
        <InputEffect
          index={index}
          effect={input.effect}
          setEffect={(effect) => setEffect(index, effect)}
        />
      </div>
    </>
  );
}
