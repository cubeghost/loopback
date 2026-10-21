export function usePermissionsPrompts(onPrompt?: () => void) {
  return {
    async promptCamera() {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      onPrompt?.();
    },
    async promptMicrophone() {
      await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
      onPrompt?.();
    },
    async promptBoth() {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      onPrompt?.();
    },
  };
}
