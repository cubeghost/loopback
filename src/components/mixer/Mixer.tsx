import { BLEND_MODES, type BlendMode } from "../../constants";
import { useSoundEffects } from "../../hooks/useSoundEffects";
import { useSketch } from "../../state/sketch";

import "./Mixer.css";

export function Mixer() {
  const { blend, blendMode, setBlend, setBlendMode } = useSketch();
  const [playClickSubtle] = useSoundEffects("click_subtle", {});
  const [playClickJuicy] = useSoundEffects("click_juicy", {
    volume: 0.25,
  });

  return (
    <div className="mixer surface">
      <fieldset>
        <legend>
          mixer
          {/* <label>
            <select
              value={blendMode}
              onChange={(event) => {
                setBlendMode(event.target.value as BlendMode["id"]);
                playClickSubtle();
              }}
            >
              <button>
                <selectedcontent></selectedcontent>
              </button>
              {BLEND_MODES.map((mode) => (
                <option key={mode.id}>{mode.id}</option>
              ))}
            </select>
          </label> */}
        </legend>
        <label className="control">
          <span className="visually-hidden">mix from 0 (left input) to 1 (right input)</span>
          <input
            type="range"
            className="fader"
            value={blend}
            step={0.1}
            min={0}
            max={1}
            onChange={(event) => {
              setBlend(event.target.value);
              playClickJuicy();
            }}
          />
        </label>
      </fieldset>
    </div>
  );
}
