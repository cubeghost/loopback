import { useMediaDevices } from "@reactuses/core";

export function useVideoDevices() {
  const [{ devices }] = useMediaDevices();
  return devices.filter((device) => device.kind === "videoinput");
}
