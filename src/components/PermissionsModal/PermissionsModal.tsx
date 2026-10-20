import { usePermission } from "@reactuses/core";
import { useEffect, useRef } from "react";

interface PermissionsModalProps {
  onAllowCamera: () => void;
  onAllowMicrophone: () => void;
  onDeny: () => void;
}

export default function PermissionsModal({
  onAllowCamera,
  onAllowMicrophone,
  onDeny,
}: PermissionsModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();
  }, []);

  async function promptCamera() {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      onAllowCamera();
    } catch (error) {}
  }

  async function promptMicrophone() {
    try {
      await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
      onAllowMicrophone();
    } catch (error) {}
  }

  async function promptBoth() {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      onAllowCamera();
      onAllowMicrophone();
    } catch (error) {}
  }

  return (
    <dialog ref={dialogRef} closedby="any" onClose={onDeny}>
      <div>
        <h3>loopback is the most fun with your camera and microphone on!</h3>
        <p>
          your camera is the default video input. your microphone allows for the feedback effects to
          react to audio.
        </p>
        <button onClick={promptBoth}>allow camera and microphone</button>

        <button onClick={promptCamera}>allow camera</button>
        <button onClick={promptMicrophone}>allow microphone</button>
        <button onClick={onDeny}>no thanks</button>
      </div>
    </dialog>
  );
}
