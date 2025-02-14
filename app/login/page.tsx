import LoginForm from "@/components/LoginForm/LoginForm";
import GoogleSignInButton from "@/components/GoogleSignInButton/GoogleSignInButton";

export default function Login() {
  return (
    <>
      <div className="auth-container">
        <div className="form-parent">
          <LoginForm />
          <GoogleSignInButton />
        </div>
      </div>
    </>
  );
}
