import { useEffect } from "react";

import { useShallow } from "zustand/shallow";

import { Hydra } from "./components/Hydra";
import { HydraCode } from "./components/HydraCode";
import { Input } from "./components/Input";
import { Mixer } from "./components/Mixer";
import { HYDRA_HEIGHT, HYDRA_WIDTH } from "./constants";
import { useGlobalState } from "./state/global";

import "./App.css";
import { Assets } from "./components/Assets";

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
      <Mixer />
      <HydraCode />

      {/* <Assets /> */}
    </div>
  );
}

export default App;
