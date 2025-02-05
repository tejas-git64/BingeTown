// import { auth, db } from "@/config/Firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";

// export const getSavedTitles = () => {
// 	const unsubscribe = onAuthStateChanged(auth, (user) => {
// 		if (user) {
// 			const uid = user.uid;
// 			const savedRef = doc(db, "saved", uid);

// 			(async function getSavedData() {
// 				//Saved data
// 				const savedDoc = await getDoc(savedRef);
// 				const savedData = savedDoc.data();
// 				if (savedData) {
// 					setSaved(savedData);
// 				}
// 			})();
// 		}
// 	});
// 	return () => unsubscribe();
// };
