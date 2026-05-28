"use client";

import { auth } from "@/firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
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
  isAuthReady: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

const publicRoutes = new Set(["/", "/login", "/signup", "/not-found"]);
const authCookieName = "bingetown-auth";

const setAuthCookie = () => {
  document.cookie = `${authCookieName}=true; path=/; max-age=2592000; SameSite=Lax`;
};

const clearAuthCookie = () => {
  document.cookie = `${authCookieName}=; path=/; max-age=0; SameSite=Lax`;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);
  const path = usePathname();
  const router = useRouter();
  const isPublicRoute = publicRoutes.has(path);
  const memoizedContext = useMemo(
    () => ({
      username: userName,
      isLoggedIn: isLoggedIn,
      isAuthReady: isAuthReady,
      setIsLoggedIn: setIsLoggedIn,
    }),
    [userName, isLoggedIn, isAuthReady],
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthCookie();
        startTransition(() => {
          setUserName(user.displayName);
          setIsLoggedIn(true);
          setIsAuthReady(true);
        });
        return;
      }

      clearAuthCookie();
      startTransition(() => {
        setUserName(null);
        setIsLoggedIn(false);
        setIsAuthReady(true);
      });

      if (!isPublicRoute) {
        router.replace("/");
      }
    });
    return unsubscribe;
  }, [isPublicRoute, router]);

  useEffect(() => {
    if (!isAuthReady || isLoggedIn || isPublicRoute) return;
    router.replace("/");
  }, [isAuthReady, isLoggedIn, isPublicRoute, router]);

  return (
    <AuthContext.Provider value={memoizedContext}>
      {isPublicRoute || (isAuthReady && isLoggedIn) ? children : null}
    </AuthContext.Provider>
  );
};
