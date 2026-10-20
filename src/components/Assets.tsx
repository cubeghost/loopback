import { useState } from "react";

import { VIDEO_ASSETS } from "../constants";
import { useSoundEffects } from "../hooks/useSoundEffects";

import "./Assets.css";

export function Assets() {
  const [isOpen, setOpen] = useState(true);
  const [play] = useSoundEffects("click_subtle");

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
