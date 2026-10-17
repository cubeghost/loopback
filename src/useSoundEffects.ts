import useSound from "use-sound";
import { useGlobalState } from "./state/global";

const SOUNDS = {
  click: "/click_002.mp3",
  scroll: "/scroll_004.mp3",
};

type Sound = keyof typeof SOUNDS;

export function useSoundEffects(sound: Sound = "click", options = {}) {
  const soundEnabled = useGlobalState((state) => state.soundEnabled);

  return useSound(SOUNDS[sound], {
    volume: 0.5,
    soundEnabled,
    ...options,
  });
}
