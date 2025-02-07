import { AuthError } from "firebase/auth";

export const getErrorStatus = (err: AuthError) => {
  switch (true) {
    case err.code === "auth/email-already-in-use":
      return "Email already exists!";
    case err.code === "auth/invalid-email":
      return "Invalid email format";
    case err.code === "auth/user-disabled":
      return "User account is disabled";
    case err.code === "auth/user-not-found":
      return "User account not found";
    case err.code === "auth/wrong-password":
      return "Entered wrong password";
    default:
      return "";
  }
};
