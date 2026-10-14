import { Hydra } from "./Hydra";
import { useSketch } from "./state/sketch";

import "./App.css";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useGlobalState } from "./state/global";
import { Input } from "./Input";
import { HYDRA_HEIGHT, HYDRA_WIDTH } from "./constants";

function App() {
  const setVideoSources = useGlobalState(
    useShallow((state) => state.setVideoSources),
  );

  useEffect(() => {
    (async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoSources = devices.filter(
        (device) => device.kind === "videoinput",
      );
      setVideoSources(videoSources);
    })();
  }, []);

  const { inputs, feedback, setFeedback } = useSketch();

  return (
    <div
      className="app"
      style={{
        "--hydra-width": `${HYDRA_WIDTH}px`,
        "--hydra-height": `${HYDRA_HEIGHT}px`,
      }}
    >
      <Input index={0} />
      <Input index={1} />

      <Hydra />

      <div className="mixer">
        <fieldset>
          <legend>Feedback</legend>
          <div>
            <label htmlFor="main-source">Main</label>
            <select
              value={feedback.mainSource}
              onChange={(e) =>
                setFeedback({ mainSource: parseInt(e.target.value) })
              }
            >
              {Object.keys(inputs).map((index) => (
                <option key={index} value={index}>
                  Input {index}
                </option>
              ))}
            </select>
            <label htmlFor="modulator-source">Modulator</label>
            <select
              value={feedback.modulateSource}
              onChange={(e) =>
                setFeedback({
                  modulateSource:
                    e.target.value === "self"
                      ? "self"
                      : parseInt(e.target.value),
                })
              }
            >
              <option value="self">Self</option>
              {Object.keys(inputs).map((index) => (
                <option key={index} value={index}>
                  Input {index}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>
              Threshold
              <input
                type="range"
                value={feedback.threshold}
                step={0.05}
                min={0}
                max={1}
                onChange={(event) =>
                  setFeedback({ threshold: parseFloat(event.target.value) })
                }
              />
            </label>
            <label>
              Intensity
              <input
                type="range"
                value={feedback.intensity}
                step={0.01}
                min={0.01}
                max={0.2}
                onChange={(event) =>
                  setFeedback({ intensity: parseFloat(event.target.value) })
                }
              />
            </label>
            <label>
              Scale
              <input
                type="range"
                value={feedback.scale}
                step={0.05}
                min={-2}
                max={2}
                onChange={(event) =>
                  setFeedback({ scale: parseFloat(event.target.value) })
                }
              />
            </label>
            <label>
              Offset
              <input
                type="range"
                value={feedback.offset}
                step={0.25}
                min={-2}
                max={2}
                onChange={(event) =>
                  setFeedback({ offset: parseFloat(event.target.value) })
                }
              />
            </label>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default App;
