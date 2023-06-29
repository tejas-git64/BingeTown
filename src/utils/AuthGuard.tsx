import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/Firebase";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthGuardProps } from "../pages/Auth";

const AuthGuard: React.FC<AuthGuardProps> = ({ component }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const navigate = useNavigate();
	const path = useLocation().pathname;
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user !== null) {
				setIsAuthenticated(true);
			} else {
				navigate("/login");
				setIsAuthenticated(false);
			}
		});
	}, [navigate, path]);

	if (isAuthenticated) {
		return <>{component}</>;
	} else {
		<Navigate to='/login' />;
	}
};
export default AuthGuard;
