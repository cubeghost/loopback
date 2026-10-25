import { useSoundEffects } from "../../hooks/useSoundEffects";
import { useSketch } from "../../state/sketch";
import { normalizeRangeValue } from "../../utils";
import { KnobInput } from "../knob/KnobInput";
import { ToggleSwitch } from "../toggle/ToggleSwitch";

import "./Feedback.css";

interface FeedbackProps {
  enableAudio: boolean;
}

function rangePlaybackRate(normalized: number) {
  return 0.5 + normalized * 0.3;
}

export function Feedback({ enableAudio }: FeedbackProps) {
  const { feedback, setFeedback } = useSketch();
  const [playClick] = useSoundEffects("click_subtle");
  const [playScroll] = useSoundEffects("scroll", {
    volume: 0.15,
  });

  return (
    <div className="feedback surface">
      <fieldset>
        <legend>feedback</legend>
        <div className="knob-row">
          <KnobInput
            id="threshold"
            label="drop"
            value={feedback.threshold}
            step={0.05}
            min={0}
            max={1}
            onChange={(value) => {
              setFeedback({ threshold: value });
              playScroll({
                playbackRate: rangePlaybackRate(normalizeRangeValue(value, 0, 1)),
              });
            }}
          />
          <KnobInput
            id="intensity"
            label="echo"
            value={feedback.intensity}
            step={0.01}
            min={-0.2}
            max={0.2}
            onChange={(value) => {
              setFeedback({ intensity: value });
              playScroll({
                playbackRate: rangePlaybackRate(normalizeRangeValue(value, -0.2, 0.2)),
              });
            }}
          />
          <KnobInput
            id="scale"
            label="zoom"
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
          {/* <KnobInput
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
          /> */}
        </div>
        <div className="options-row">
          <KnobInput
            id="audio-reactive-amount"
            label="mic"
            value={feedback.audioReactiveAmount}
            step={0.1}
            min={-5}
            max={5}
            style={{ "--knob-size": "3rem" } as React.CSSProperties}
            disabled={!enableAudio || !feedback.audioReactive}
            led
            onChange={(value) => {
              setFeedback({ audioReactiveAmount: value });
              playScroll({
                playbackRate: rangePlaybackRate(normalizeRangeValue(value, -5, 5)),
              });
            }}
          />
          <ToggleSwitch
            label="mask"
            value={feedback.mask}
            onChange={(value) => {
              setFeedback({ mask: value });
              playClick();
            }}
          />
          <ToggleSwitch
            label="follow"
            value={feedback.followCursor}
            onChange={(value) => {
              setFeedback({ followCursor: value });
              playClick();
            }}
          />
        </div>
      </fieldset>
    </div>
  );
}
