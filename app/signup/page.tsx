import GoogleSignInButton from "@/components/GoogleSignInButton/GoogleSignInButton";
import SignupForm from "@/components/SignupForm/SignupForm";

export default function Signup() {
  return (
    <>
      <div className="relative z-0 -mt-14 grid h-[100dvh] max-h-[1000px] w-full place-items-center bg-neutral-900 p-4">
        <div className="w-full rounded-xl border-2 border-black p-5 px-6 sm:w-[450px]">
          <SignupForm />
          <GoogleSignInButton />
        </div>
      </div>
    </>
  );
}
