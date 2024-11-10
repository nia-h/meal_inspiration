import { useContext } from "react";
import { MainIngredsContext } from "./mainIngreds-Provider";

// export const EVENT_COLORS = ["red", "green", "blue"] as const;

export function useMainIngreds() {
  const value = useContext(MainIngredsContext);
  if (value === null) throw new Error("useMainIngreds must be used within an EventsProvider");
  return value;
}
