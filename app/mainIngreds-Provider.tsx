"use client";
import React, { ReactNode, createContext, useEffect, useState } from "react";

export type MainIngredsContextType = {
  mainIngreds: string[];
  updateMainIngreds: (newMainINgreds: string[]) => void;
};

type MainIngredsProviderProps = {
  children: ReactNode;
};

export const MainIngredsContext = createContext<MainIngredsContextType | null>(null);

export function MainIngredsProvider({ children }: MainIngredsProviderProps) {
  const [mainIngreds, setMainIngreds] = useSessionStorage("MainIngreds"); // new [***, set***] lables for [value, setValue]returned from useSessionStorage

  function updateMainIngreds(newMainIngreds: string[]) {
    setMainIngreds(newMainIngreds);
  }

  return <MainIngredsContext.Provider value={{ mainIngreds, updateMainIngreds }}>{children}</MainIngredsContext.Provider>;
}

export function useSessionStorage(key: string, initialValue: string[] = []) {
  const [value, setValue] = useState<string[]>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    //this fn evaluate to initial value/default value
    const jsonValue = sessionStorage.getItem(key);
    console.log("jsonValue==>", jsonValue);
    if (jsonValue === null) return initialValue;

    return JSON.parse(jsonValue) as string[];
  });

  // Call Hooks from custom Hooks
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}
