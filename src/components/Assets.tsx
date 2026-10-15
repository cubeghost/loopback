import { useState } from "react";
import "./Assets.css";
import { VIDEO_ASSETS } from "../constants";

export function Assets() {
  const [isOpen, setOpen] = useState(true);

  return (
    <details>
      <summary>assets</summary>
      <div>
        {VIDEO_ASSETS.map((asset) => (
          <img src={asset.thumbUrl} height={200} key={asset.id} />
        ))}
      </div>
    </details>
  );
}
