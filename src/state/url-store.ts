import JSONCrush from "jsoncrush";
import { type StateStorage } from "zustand/middleware";

export const crushStorage: StateStorage = {
  getItem: (key): string => {
    const searchParams = new URLSearchParams(location.search);
    const storedValue = searchParams.get(key) ?? "";
    return JSON.parse(JSONCrush.uncrush(storedValue));
  },
  setItem: (key, newValue): void => {
    const searchParams = new URLSearchParams(location.search);
    const encoded = encodeURIComponent(
      JSONCrush.crush(JSON.stringify(newValue)),
    );
    searchParams.set(key, encoded);
    window.history.replaceState(null, "", `?${searchParams.toString()}`);
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete(key);
    window.history.replaceState(null, "", `?${searchParams.toString()}`);
  },
};
