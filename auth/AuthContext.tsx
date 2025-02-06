"use client";

import { auth } from "@/firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { redirect, usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ReactNode } from "react";

type AuthContextType = {
  user: string | undefined;
  setUser: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | undefined>(undefined);
  const authStatus = useRef(false);

  const path = usePathname();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        authStatus.current = true;
      } else {
        authStatus.current = false;
        if (path !== "/login" && path !== "/signup" && path !== "/") {
          redirect("login");
        }
      }
    });
  }, [path]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
