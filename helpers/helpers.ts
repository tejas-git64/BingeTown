export const getErrorStatus = (err: string) => {
  switch (true) {
    case err === "auth/email-already-in-use":
      return "Email already exists!";
    case err === "auth/internal-error":
      return "Unexpected error!, try again";
    case err === "auth/invalid-email":
      return "Invalid email format";
    case err === "auth/invalid-password":
      return "Incorrect password!";
    case err === "auth/user-disabled":
      return "User account is disabled";
    case err === "auth/too-many-requests":
      return "Too many attempts reached!, try again later";
    case err === "auth/user-not-found":
      return "User account not found";
    case err === "auth/invalid-credential":
      return "Entered invalid credentials";
    default:
      return "";
  }
};
