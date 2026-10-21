import { useSoundEffects } from "../../hooks/useSoundEffects";
import { useSketch } from "../../state/sketch";

import "./Feedback.css";

function normalizeRangeValue(event: React.ChangeEvent<HTMLInputElement>) {
  const min = parseFloat(event.target.min);
  const max = parseFloat(event.target.max);
  const value = parseFloat(event.target.value);
  return (value - min) / (max - min);
}

function rangePlaybackRate(event: React.ChangeEvent<HTMLInputElement>) {
  return 0.4 + normalizeRangeValue(event) * 0.5;
}

export function Feedback() {
  const { feedback, setFeedback } = useSketch();
  const [playClick] = useSoundEffects("click_subtle");
  const [playScroll /*, { stop: stopScroll }*/] = useSoundEffects("scroll", {
    volume: 0.15,
    // loop: true,
  });

  // const rangeProps = {
  //   onPointerDown: () => playScroll(),
  //   onPointerUp: () => stopScroll(),
  //   onPointerCancel: () => stopScroll(),
  // };

  return (
    <div className="feedback">
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
              onChange={(event) => {
                setFeedback({ threshold: event.target.value });
                playScroll({
                  playbackRate: rangePlaybackRate(event),
                });
              }}
              // {...rangeProps}
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
              onChange={(event) => {
                setFeedback({ intensity: event.target.value });
                playScroll();
              }}
              // {...rangeProps}
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
              onChange={(event) => {
                setFeedback({ scale: event.target.value });
                playScroll();
              }}
              // {...rangeProps}
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
              onChange={(event) => {
                setFeedback({ offset: event.target.value });
                playScroll();
              }}
              // {...rangeProps}
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
              onChange={(event) => {
                setFeedback({ audioReactiveAmount: event.target.value });
                playScroll();
              }}
              // {...rangeProps}
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
    </div>
  );
}
