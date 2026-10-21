import { useEffect, useRef } from "react";

import { usePermissionsPrompts } from "./usePermissionsPrompts";

import "./PermissionsModal.css";

interface PermissionsModalProps {
  open: boolean;
  onClose: () => void;
}

export function PermissionsModal({ open, onClose }: PermissionsModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { promptCamera, promptMicrophone, promptBoth } = usePermissionsPrompts(onClose);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();
  }, []);

  return (
    <dialog ref={dialogRef} closedby="any" onClose={onClose}>
      <div>
        <h3>loopback is the most fun with your camera and microphone on!</h3>
        <p>
          your camera is the default video input. your microphone allows for the feedback effects to
          react to audio.
        </p>
        <button onClick={promptBoth}>allow camera and microphone</button>
        <button onClick={promptCamera}>allow camera</button>
        <button onClick={promptMicrophone}>allow microphone</button>
        <button onClick={onClose}>no thanks</button>
      </div>
    </dialog>
  );
}
