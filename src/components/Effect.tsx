import type { ChangeEvent } from "react";
import { EFFECTS } from "../constants";
import type { SketchEffect } from "../state/sketch";
import { useSoundEffects } from "../useSoundEffects";

import "./Effect.css";

interface EffectProps {
  index: number;
  effect: SketchEffect;
  setEffect: (effect: Partial<SketchEffect>) => void;
}

export function Effect({ index, effect, setEffect }: EffectProps) {
  const group = `effect-${index}`;
  const [play] = useSoundEffects("click");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value === "null" ? null : event.target.value;
    setEffect({ id: value as SketchEffect["id"] });
    play();
  }

  return (
    <div className="surface effect">
      <fieldset>
        <legend>
          <span>Effect</span>
        </legend>
        <div className="effect-options">
          <label className="effect-option">
            <div className="thumbnail thumbnail-none">
              <span className="visually-hidden">None</span>
            </div>
            <input
              type="radio"
              name={group}
              value="null"
              checked={effect.id === null}
              onChange={handleChange}
            />
          </label>
          {EFFECTS.map((eff) => (
            <label key={eff.id} className="effect-option">
              <div className="thumbnail">
                <img src={eff.thumbnail} className="thumbnail-gif" alt="TODO" />
                <img
                  src={eff.thumbnailStill}
                  className="thumbnail-still"
                  alt="TODO"
                />
              </div>
              <input
                type="radio"
                name={group}
                value={eff.id}
                checked={effect.id === eff.id}
                onChange={handleChange}
              />
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
