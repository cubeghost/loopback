import { useEffect, useMemo, useRef, useState } from "react";
import { KnobHeadless, KnobHeadlessOutput, useKnobKeyboardControls } from "react-knob-headless";

import { denormalizeRangeValue, normalizeRangeValue } from "../../utils";

import "./KnobInput.css";

type KnobHeadlessProps = React.ComponentProps<typeof KnobHeadless>;
type KnobKeyboardProps = Parameters<typeof useKnobKeyboardControls>[0];
type KnobInputProps = {
  id: string;
  label: string;
  min: KnobHeadlessProps["valueMin"];
  max: KnobHeadlessProps["valueMax"];
  step: KnobKeyboardProps["step"];
  value: KnobHeadlessProps["valueRaw"];
  onChange: KnobHeadlessProps["onValueRawChange"];
  className?: string;
  style?: React.CSSProperties;
};

const minAngle = -145;
const maxAngle = 145;

export function KnobInput({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step,
  className,
  style = {},
}: KnobInputProps) {
  const valueRawRoundFn = useMemo(() => (v: number) => Math.floor(v / step) * step, [step]);

  const [rawValue, setRawValue] = useState(value);
  const roundValueRef = useRef(valueRawRoundFn(value));
  useEffect(() => {
    const round = valueRawRoundFn(rawValue);
    if (roundValueRef.current !== round) {
      onChange(round);
    }
    roundValueRef.current = round;
  }, [onChange, valueRawRoundFn, rawValue]);

  const normalizedValue = normalizeRangeValue(valueRawRoundFn(value), min, max);
  const angle = denormalizeRangeValue(normalizedValue, minAngle, maxAngle);

  const keyboardControlHandlers = useKnobKeyboardControls({
    valueRaw: value,
    valueMin: min,
    valueMax: max,
    step,
    stepLarger: step,
    onValueRawChange: setRawValue,
  });

  return (
    <div className={`knob-container ${className}`} style={style}>
      <label htmlFor={id} className="visually-hidden">
        {label}
      </label>
      <KnobHeadless
        id={id}
        className="knob-input"
        aria-labelledby="" // TODO
        valueMin={min}
        valueMax={max}
        valueRaw={rawValue}
        dragSensitivity={0.006}
        mapTo01={normalizeRangeValue}
        mapFrom01={denormalizeRangeValue}
        onValueRawChange={setRawValue}
        valueRawRoundFn={valueRawRoundFn}
        valueRawDisplayFn={() => ""}
        {...keyboardControlHandlers}
      >
        <div className="knob-thumb">
          <div
            className="knob-thumb-inner"
            style={{ "--angle": `${angle}deg` } as React.CSSProperties}
          >
            <div className="knob-thumb-indicator" />
          </div>
        </div>
      </KnobHeadless>
      <KnobHeadlessOutput htmlFor={id}>{Math.round(normalizedValue * 100)}%</KnobHeadlessOutput>
    </div>
  );
}
