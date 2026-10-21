import { usePermission } from "@reactuses/core";

import { usePermissionsPrompts } from "./usePermissionsPrompts";

import "./PermissionsPrompts.css";

export function PermissionsPrompts() {
  const { promptCamera, promptMicrophone } = usePermissionsPrompts();

  const microphone = usePermission({ name: "microphone" });
  const camera = usePermission({ name: "camera" });

  return (
    <div className="permissions-prompts">
      {microphone !== "granted" && <button onClick={promptMicrophone}>enable microphone</button>}
      {camera !== "granted" && <button onClick={promptCamera}>enable camera</button>}
    </div>
  );
}
