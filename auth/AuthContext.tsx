"use client";

import { auth } from "@/firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { redirect, usePathname } from "next/navigation";
import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { ReactNode } from "react";
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export type AuthContextType = {
  username: RefObject<string | null>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const username = useRef<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const path = usePathname();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        username.current = user.displayName;
        setIsLoggedIn(true);
      } else {
        if (path !== "/login" && path !== "/signup" && path !== "/") {
          setIsLoggedIn(false);
          redirect("/");
        }
      }
    });
  }, [isLoggedIn, path]);

  return (
    <AuthContext.Provider value={{ username, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
