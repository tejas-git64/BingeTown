import LoginForm from "@/components/LoginForm/LoginForm";
import GoogleSignInButton from "@/components/GoogleSignInButton/GoogleSignInButton";

export default function Login() {
  return (
    <>
      <div className="relative z-0 grid h-[100dvh] max-h-[1000px] w-full place-items-center bg-neutral-900">
        <div className="w-full rounded-xl border-2 border-black p-5 px-6 sm:w-[450px]">
          <LoginForm />
          <GoogleSignInButton />
        </div>
      </div>
    </>
  );
}
