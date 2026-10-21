import useSound from "use-sound";
import { useGlobalState } from "../state/global";

const SOUNDS = {
  /* "Click 2" (https://freesound.org/s/827133/) by CAT-FOX_ALEX, licensed under CC0 */
  click_juicy: "/827133__cat-fox_alex__click-2.mp3",
  /* "click_002" & "scroll_004" (https://kenney.nl/assets/interface-sounds) by Kenney, licensed under CC0 */
  click_subtle: "/click_002.mp3",
  scroll: "/scroll_005_clip.mp3",
};

type Sound = keyof typeof SOUNDS;

export function useSoundEffects(sound: Sound = "click_subtle", options = {}) {
  const soundEnabled = useGlobalState((state) => state.soundEnabled);

  return useSound(SOUNDS[sound], {
    volume: 0.5,
    soundEnabled,
    ...options,
  });
}
