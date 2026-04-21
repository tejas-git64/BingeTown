import GoogleSignInButton from "@/components/GoogleSignInButton/GoogleSignInButton";
import SignupForm from "@/components/SignupForm/SignupForm";

export default function Signup() {
  return (
    <div className="auth-container">
      <div className="form-parent">
        <SignupForm />
        <GoogleSignInButton />
      </div>
    </div>
  );
}
