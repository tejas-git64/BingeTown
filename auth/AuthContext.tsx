"use client";

import { auth } from "@/firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { redirect, usePathname } from "next/navigation";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  ReactNode,
  useMemo,
  startTransition,
} from "react";
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export type AuthContextType = {
  username: string | null;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const path = usePathname();
  const memoizedContext = useMemo(
    () => ({
      username: userName,
      isLoggedIn: isLoggedIn,
      setIsLoggedIn: setIsLoggedIn,
    }),
    [userName, isLoggedIn, setIsLoggedIn],
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        startTransition(() => {
          setUserName(user.displayName);
          setIsLoggedIn(true);
        });
      } else if (path !== "/login" && path !== "/signup" && path !== "/") {
        setIsLoggedIn(false);
        redirect("/");
      }
    });
  }, [isLoggedIn, path]);

  return (
    <AuthContext.Provider value={memoizedContext}>
      {children}
    </AuthContext.Provider>
  );
};
