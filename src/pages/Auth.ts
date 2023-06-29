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
};
