import { Hydra } from "./Hydra";
import { useSketch } from "./state/sketch";

import "./App.css";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useGlobalState } from "./state/global";
import { Input } from "./Input";

function App() {
  const setWebcams = useGlobalState(useShallow((state) => state.setWebcams));

  useEffect(() => {
    (async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoSources = devices.filter(
        (device) => device.kind === "videoinput",
      );
      setWebcams(videoSources);
    })();
  }, []);

  const { inputs, feedback, setFeedback } = useSketch();

  return (
    <div className="app">
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
        </fieldset>
      </div>
    </div>
  );
}

export default App;
