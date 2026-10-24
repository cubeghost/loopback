import clsx from "clsx";
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
  disabled?: boolean;
  led?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const minAngle = -130;
const maxAngle = 130;

export function KnobInput({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step,
  disabled = false,
  led = false,
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

  function onValueRawChange(value: number) {
    if (disabled) return;
    setRawValue(value);
  }

  const normalizedValue = normalizeRangeValue(valueRawRoundFn(value), min, max);
  const angle = denormalizeRangeValue(normalizedValue, minAngle, maxAngle);

  const keyboardControlHandlers = useKnobKeyboardControls({
    valueRaw: rawValue,
    valueMin: min,
    valueMax: max,
    step,
    stepLarger: step * 5,
    onValueRawChange,
  });

  return (
    <div className={clsx("knob-container", className)} style={style}>
      <KnobHeadless
        id={id}
        className={clsx("knob-input", disabled && "knob-input--disabled")}
        aria-labelledby="" // TODO
        valueMin={min}
        valueMax={max}
        valueRaw={rawValue}
        dragSensitivity={0.006}
        mapTo01={normalizeRangeValue}
        mapFrom01={denormalizeRangeValue}
        onValueRawChange={onValueRawChange}
        valueRawRoundFn={valueRawRoundFn}
        valueRawDisplayFn={() => ""}
        onDoubleClick={() => setRawValue(denormalizeRangeValue(0.5, min, max))}
        // @ts-expect-error
        tabIndex={0}
        {...keyboardControlHandlers}
      >
        <div
          className="knob-thumb"
          style={{ "--knob-angle": `${angle}deg` } as React.CSSProperties}
        >
          <div className="knob-thumb-outer">
            <div className="knob-thumb-gradient" />
            <div className="knob-thumb-indicator" />
            {led}
          </div>
          <div className="knob-thumb-inner"></div>
        </div>
      </KnobHeadless>
      <label htmlFor={id} className="knob-label">
        {label}
      </label>
      <KnobHeadlessOutput className="visually-hidden" htmlFor={id}>
        {Math.round(normalizedValue * 100)}%
      </KnobHeadlessOutput>
    </div>
  );
}
