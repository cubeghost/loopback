import { usePermission } from "@reactuses/core";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

import { Assets } from "./components/Assets";
import { Credits } from "./components/Credits";
import { Feedback } from "./components/feedback/Feedback";
import { HydraCode } from "./components/hydra/HydraCode";
import { Hydra } from "./components/hydra/HydraFrame";
import { Input } from "./components/input/Input";
import { Mixer } from "./components/mixer/Mixer";
import { PermissionsModal } from "./components/permissions/PermissionsModal";
import { PermissionsPrompts } from "./components/permissions/PermissionsPrompts";
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
  const [permissionsModal, setPermissionsModal] = useState(true);
  const microphone = usePermission({ name: "microphone" });
  const camera = usePermission({ name: "camera" });

  useEffect(() => {
    if (camera === "granted") {
      setInputSource(0, {
        type: "camera",
        cameraIndex: 0,
      });
    }
  }, [camera, setInputSource]);

  useEffect(() => {
    if (camera === "granted") {
      setInputSource(0, {
        type: "camera",
        cameraIndex: 0,
      });
    }
  }, [camera, setInputSource]);

  useEffect(() => {
    if (microphone === "granted") {
      setFeedback({ audioReactive: true });
    }
  }, [microphone, setFeedback]);

  return (
    <>
      {(microphone === "prompt" || camera === "prompt") && permissionsModal && (
        <PermissionsModal open={permissionsModal} onClose={() => setPermissionsModal(false)} />
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

        <Hydra enableAudio={microphone === "granted"} />
        <Feedback enableAudio={microphone === "granted"} />

        <HydraCode />

        {/* <Assets /> */}

        <Credits />
        {!permissionsModal && <PermissionsPrompts />}
      </div>
    </>
  );
}

export default App;
