import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/Firebase";
import React, { useEffect, useState } from "react";
import { AuthGuardProps } from "../types/Auth";
import { redirect } from "next/navigation";

const AuthGuard: React.FC<AuthGuardProps> = ({ component }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user !== null) {
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
				redirect("/login");
			}
		});
	}, []);

	if (isAuthenticated) {
		return <>{component}</>;
	} else {
		redirect("/login");
	}
};
export default AuthGuard;
