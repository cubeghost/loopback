import { useSoundEffects } from "../../hooks/useSoundEffects";
import { useSketch } from "../../state/sketch";

import "./Mixer.css";

export function Mixer() {
  const { blend, setBlend } = useSketch();
  const [playClick] = useSoundEffects("click_juicy", {
    volume: 0.25,
  });

  return (
    <div className="mixer surface">
      <fieldset>
        <legend>blend</legend>
        <label className="control">
          <input
            type="range"
            className="fader"
            value={blend}
            step={0.1}
            min={0}
            max={1}
            onChange={(event) => {
              setBlend(event.target.value);
              playClick();
            }}
          />
        </label>
      </fieldset>
    </div>
  );
}
