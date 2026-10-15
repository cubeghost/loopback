import { useSketch } from "../state/sketch";
import "./Mixer.css";

export function Mixer() {
  const {
    feedback,
    setFeedback,
    audioReactive,
    setAudioReactive,
    mouseReactive,
    setMouseReactive,
  } = useSketch();

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
              onChange={(event) =>
                setFeedback({ threshold: event.target.value })
              }
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
              onChange={(event) =>
                setFeedback({ intensity: event.target.value })
              }
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
            />
          </label>
        </div>
        <div>
          <label className="control">
            Audio reactive
            <input
              type="checkbox"
              checked={audioReactive.enabled}
              onChange={(event) =>
                setAudioReactive({ enabled: event.target.checked })
              }
            />
          </label>
          <label className="control">
            Amount
            <input
              type="range"
              value={audioReactive.amount}
              step={0.1}
              min={-5}
              max={5}
              onChange={(event) =>
                setAudioReactive({ amount: event.target.value })
              }
            />
          </label>
        </div>
        <div>
          <label className="control">
            Follow mouse
            <input
              type="checkbox"
              checked={mouseReactive.enabled}
              onChange={(event) =>
                setMouseReactive({ enabled: event.target.checked })
              }
            />
          </label>
        </div>
      </fieldset>
    </div>
  );
}
