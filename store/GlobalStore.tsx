"use client";

import { LayoutContextTypes } from "@/types/LayoutTypes";
import { createContext, useContext, useEffect, useRef, useState } from "react";

export const GlobalStore = createContext<LayoutContextTypes>(
  {} as LayoutContextTypes,
);
export const useGlobalStore = () => useContext(GlobalStore);
export const GlobalContext = ({ children }: { children: React.ReactNode }) => {
  const svg = useRef(0);
  const [sideNav, setSideNav] = useState(false);
  useEffect(() => {
    svg.current = Math.floor(Math.random() * 2000) + 1;
  }, []);

  return (
    <GlobalStore.Provider
      value={{
        svg: svg.current,
        sideNav,
        setSideNav,
      }}
    >
      {children}
    </GlobalStore.Provider>
  );
};
