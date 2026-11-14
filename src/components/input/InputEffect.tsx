import clsx from "clsx";
import { type ChangeEvent } from "react";

import { EFFECTS } from "../../effects";
import { useSoundEffects } from "../../hooks/useSoundEffects";
import type { SketchEffect } from "../../state/sketch";

import "./InputEffect.css";

interface EffectProps {
  index: number;
  effect: SketchEffect;
  setEffect: (effect: Partial<SketchEffect>) => void;
}

export function InputEffect({ index, effect, setEffect }: EffectProps) {
  const [play] = useSoundEffects("click_juicy");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setEffect({ id: event.target.value as SketchEffect["id"] });
    play();
  }

  function selectPrevious() {
    const previous = (parseInt(effect.id) - 1 + EFFECTS.length) % EFFECTS.length;
    setEffect({
      id: previous.toString() as SketchEffect["id"],
    });
  }

  function selectNext() {
    const next = (parseInt(effect.id) + 1) % EFFECTS.length;
    setEffect({
      id: next.toString() as SketchEffect["id"],
    });
  }

  return (
    <div className="surface effects">
      <fieldset>
        <legend>
          <span>effect</span>
        </legend>
        <div className="effect-picker" role="group">
          <div
            className="effect-options"
            style={{ "--effect-value": effect.id } as React.CSSProperties}
          >
            <div className="effect-options-inner">
              {EFFECTS.map((eff) => (
                <label key={eff.id} className={clsx("effect-option", `effect-option-${eff.id}`)}>
                  <div className="thumbnail">
                    {eff.thumbnailStill ? (
                      <>
                        {eff.thumbnail && (
                          <img src={eff.thumbnail} className="thumbnail-gif" alt="TODO" />
                        )}
                        <img src={eff.thumbnailStill} className="thumbnail-still" alt="TODO" />
                      </>
                    ) : (
                      <span>{eff.id}</span>
                    )}
                  </div>
                  <input
                    type="radio"
                    name={`effect-${index}`}
                    value={eff.id}
                    checked={effect.id === eff.id}
                    onChange={handleChange}
                  />
                </label>
              ))}
            </div>
          </div>
          <div className="effect-picker-controls">
            <button onClick={selectPrevious} className="previous-effect">
              &#9664;
            </button>
            <button onClick={selectNext} className="next-effect">
              &#9654;
            </button>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
