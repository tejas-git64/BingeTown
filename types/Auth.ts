import { ReactNode } from "react";

export type Credentials = {
  email: string;
  password: string;
};

export type AuthGuardProps = {
  component: ReactNode;
};

export type AuthError = {
  code: string;
  message: string;
};

export type APIResponse = {
  success: boolean;
  message: string;
};
