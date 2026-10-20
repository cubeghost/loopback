import { usePermission } from "@reactuses/core";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

import { Assets } from "./components/Assets";
import { Credits } from "./components/Credits";
import { Feedback } from "./components/Feedback/Feedback";
import { Hydra } from "./components/Hydra";
import { HydraCode } from "./components/HydraCode";
import { Input } from "./components/Input";
import { Mixer } from "./components/Mixer/Mixer";
import PermissionsModal from "./components/PermissionsModal/PermissionsModal";
import { HYDRA_HEIGHT, HYDRA_WIDTH, VIDEO_ASSETS } from "./constants";
import { useSketch } from "./state/sketch";

import "./App.css";

function App() {
  const { setFeedback, setInputSource } = useSketch(
    useShallow((state) => ({
      setFeedback: state.setFeedback,
      setInputSource: state.setInputSource,
    })),
  );
  const [permissionsClosed, setPermissionsClosed] = useState(false);
  const microphone = usePermission({ name: "microphone" });
  const camera = usePermission({ name: "camera" });

  function onAllowCamera() {
    setInputSource(0, {
      type: "camera",
      cameraIndex: 0,
    });
  }
  function onAllowMicrophone() {
    setFeedback({ audioReactive: true });
  }
  function onDeny() {
    setPermissionsClosed(true);
  }

  return (
    <>
      {(microphone === "prompt" || camera === "prompt") && !permissionsClosed && (
        <PermissionsModal
          onAllowCamera={onAllowCamera}
          onAllowMicrophone={onAllowMicrophone}
          onDeny={onDeny}
        />
      )}
      <div
        className="app"
        style={
          {
            "--hydra-width": `${HYDRA_WIDTH}px`,
            "--hydra-height": `${HYDRA_HEIGHT}px`,
          } as React.CSSProperties
        }
      >
        <Input index={0} />
        <Input index={1} />

        <Mixer />

        <Hydra />
        <Feedback />

        <HydraCode />

        {/* <Assets /> */}

        <Credits />
      </div>
    </>
  );
}

export default App;
