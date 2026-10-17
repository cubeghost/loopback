import { useSketch } from "../state/sketch";
import { useSoundEffects } from "../useSoundEffects";

import "./Mixer.css";

export function Mixer() {
  const { feedback, blend, setFeedback, setBlend } = useSketch();
  const [playClick] = useSoundEffects("click");
  const [playScroll, { stop: stopScroll }] = useSoundEffects("scroll", {
    volume: 0.25,
    loop: true,
  });

  const rangeProps = {
    onPointerDown: () => playScroll(),
    onPointerUp: () => stopScroll(),
    onPointerCancel: () => stopScroll(),
  };

  return (
    <div className="mixer">
      <fieldset>
        <legend>Feedback</legend>
        <div>
          <label className="control">
            Threshold
            <input
              type="range"
              value={feedback.threshold}
              step={0.05}
              min={0}
              max={1}
              onChange={(event) => setFeedback({ threshold: event.target.value })}
              {...rangeProps}
            />
          </label>
          <label className="control">
            Intensity
            <input
              type="range"
              value={feedback.intensity}
              step={0.01}
              min={0.01}
              max={0.2}
              onChange={(event) => setFeedback({ intensity: event.target.value })}
              {...rangeProps}
            />
          </label>
          <label className="control">
            Scale
            <input
              type="range"
              value={feedback.scale}
              step={0.05}
              min={-2}
              max={2}
              onChange={(event) => setFeedback({ scale: event.target.value })}
              {...rangeProps}
            />
          </label>
          <label className="control">
            Offset
            <input
              type="range"
              value={feedback.offset}
              step={0.25}
              min={-2}
              max={2}
              onChange={(event) => setFeedback({ offset: event.target.value })}
              {...rangeProps}
            />
          </label>
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
          <label className="control">
            Amount
            <input
              type="range"
              value={feedback.audioReactiveAmount}
              step={0.1}
              min={-5}
              max={5}
              onChange={(event) => setFeedback({ audioReactiveAmount: event.target.value })}
              {...rangeProps}
            />
          </label>
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
      <fieldset>
        <legend>Blend</legend>
        <label className="control">
          <span>Input 0</span>
          <input
            type="range"
            value={blend}
            step={0.1}
            min={0}
            max={1}
            onChange={(event) => setBlend(event.target.value)}
            {...rangeProps}
          />
        </label>
        <span>Input 1</span>
      </fieldset>
    </div>
  );
}
