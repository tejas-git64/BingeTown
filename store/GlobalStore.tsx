"use client";

import { LayoutContextTypes } from "@/types/LayoutTypes";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const GlobalStore = createContext<LayoutContextTypes>(
  {} as LayoutContextTypes,
);
export const useGlobalStore = () => useContext(GlobalStore);
export const GlobalContext = ({ children }: { children: React.ReactNode }) => {
  const [svgItem, setSvgItem] = useState(0);
  const [sideNav, setSideNav] = useState(false);
  const obj = useMemo(() => {
    return {
      svg: svgItem,
      sideNav: sideNav,
      setSideNav: setSideNav,
    };
  }, [svgItem, sideNav, setSideNav]);

  useEffect(() => {
    setSvgItem(Math.floor(Math.random() * 2000) + 1);
  }, []);

  return <GlobalStore.Provider value={obj}>{children}</GlobalStore.Provider>;
};
