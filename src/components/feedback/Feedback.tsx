import { useSoundEffects } from "../../hooks/useSoundEffects";
import { useSketch } from "../../state/sketch";
import { normalizeRangeValue } from "../../utils";
import { KnobInput } from "../knob/KnobInput";

import "./Feedback.css";

function normalizeRangeEventValue(event: React.ChangeEvent<HTMLInputElement>) {
  const min = parseFloat(event.target.min);
  const max = parseFloat(event.target.max);
  const value = parseFloat(event.target.value);
  return (value - min) / (max - min);
}

function rangePlaybackRate(normalized: number) {
  return 0.5 + normalized * 0.3;
}

export function Feedback() {
  const { feedback, setFeedback } = useSketch();
  const [playClick] = useSoundEffects("click_subtle");
  const [playScroll] = useSoundEffects("scroll", {
    volume: 0.15,
  });

  return (
    <div className="feedback">
      <fieldset>
        <legend>Feedback</legend>
        <div className="feedback-row">
          <KnobInput
            id="threshold"
            label="threshold"
            value={feedback.threshold}
            step={0.05}
            min={0}
            max={1}
            onChange={(value) => {
              console.log(value);
              setFeedback({ threshold: value });
              playScroll({
                playbackRate: rangePlaybackRate(normalizeRangeValue(value, 0, 1)),
              });
            }}
          />
          <KnobInput
            id="intensity"
            label="intensity"
            value={feedback.intensity}
            step={0.01}
            min={0}
            max={0.2}
            onChange={(value) => {
              setFeedback({ intensity: value });
              playScroll({
                playbackRate: rangePlaybackRate(normalizeRangeValue(value, 0, 0.2)),
              });
            }}
          />
          <KnobInput
            id="scale"
            label="scale"
            value={feedback.scale}
            step={0.05}
            min={-2}
            max={2}
            onChange={(value) => {
              setFeedback({ scale: value });
              playScroll({
                playbackRate: rangePlaybackRate(normalizeRangeValue(value, -2, 2)),
              });
            }}
          />
          <KnobInput
            id="offset"
            label="offset"
            value={feedback.offset}
            step={0.25}
            min={-2}
            max={2}
            onChange={(value) => {
              setFeedback({ offset: value });
              playScroll({
                playbackRate: rangePlaybackRate(normalizeRangeValue(value, -2, 2)),
              });
            }}
          />
        </div>
        <div>
          <label className="control">
            Audio reactive
            <input
              type="checkbox"
              checked={feedback.audioReactive}
              onChange={(event) => {
                setFeedback({ audioReactive: event.target.checked });
                playClick();
              }}
            />
          </label>
          <KnobInput
            id="audio-reactive-amount"
            label="audio reactive amount"
            value={feedback.audioReactiveAmount}
            step={0.1}
            min={-5}
            max={5}
            style={{ "--knob-size": "2rem" } as React.CSSProperties}
            onChange={(value) => {
              setFeedback({ audioReactiveAmount: value });
              playScroll({
                playbackRate: rangePlaybackRate(normalizeRangeValue(value, -5, 5)),
              });
            }}
          />
        </div>
        <div>
          <label className="control">
            Mask
            <input
              type="checkbox"
              checked={feedback.mask}
              onChange={(event) => {
                setFeedback({ mask: event.target.checked });
                playClick();
              }}
            />
          </label>
          <label className="control">
            Follow mouse
            <input
              type="checkbox"
              checked={feedback.followCursor}
              onChange={(event) => {
                setFeedback({ followCursor: event.target.checked });
                playClick();
              }}
            />
          </label>
        </div>
      </fieldset>
    </div>
  );
}
