import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { LayoutContext } from "@/app/layout";
import { LayoutContextTypes } from "@/types/LayoutTypes";

type ShowProps = {
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UserMenu({ show, setShow }: ShowProps) {
	const { push } = useRouter();
	const { setProfilePage } = useContext<LayoutContextTypes>(LayoutContext);

	const SignOut = async () => {
		try {
			await signOut(auth);
			onAuthStateChanged(auth, (user) => {
				if (user === null) {
					push("/");
				}
			});
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<div
				onMouseLeave={() => setShow(false)}
				onTouchMove={() => setShow(false)}
				className={`${
					show ? "absolute" : "hidden"
				} right-0 top-16 flex h-28 w-36 flex-col items-center justify-evenly rounded-md bg-neutral-800 px-3`}>
				<div
					onClick={() => setProfilePage(true)}
					className='w-full flex-shrink-0 whitespace-nowrap rounded-lg border-none p-2 text-sm font-bold text-gray-500 outline-none hover:bg-teal-400 hover:text-black'>
					View Profile
				</div>
				<button
					onClick={SignOut}
					type='button'
					className='w-full flex-shrink-0 whitespace-nowrap border-none text-sm font-bold text-gray-500 outline-none hover:bg-red-400 hover:text-black'>
					Logout
				</button>
			</div>
		</>
	);
}
