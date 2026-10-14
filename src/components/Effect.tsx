import type { SketchEffect } from "../state/sketch";
import "./Effect.css";

interface EffectProps {
  effect: SketchEffect;
  setEffect: (effect: Partial<SketchEffect>) => void;
}

export function Effect({ effect, setEffect }: EffectProps) {
  return (
    <div className="effect">
      <fieldset>
        <legend>
          <span>Effect</span>
          <label>
            <input
              type="checkbox"
              className="effect-enabled"
              checked={!!effect.enabled}
              onChange={(e) => setEffect({ enabled: e.target.checked })}
            />
            Enabled
          </label>
        </legend>
      </fieldset>
    </div>
  );
}
