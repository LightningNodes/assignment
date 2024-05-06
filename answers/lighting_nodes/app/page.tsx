"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { initFirebase } from "../lib/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { usePathname } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

export default function Home() {
	initFirebase();
	const [error, setError] = useState(null); // Add state to handle errors
	const provider = new GoogleAuthProvider();
	const auth = getAuth();
	const [user, loading] = useAuthState(auth);
	const pathname = usePathname();
	const router = useRouter();

	if (loading) {
		return <div>Loading...</div>;
	}

	if (user) {
		// Use router.push() after a delay to ensure the component is fully rendered before redirecting
		setTimeout(() => router.push("/livepage"), 0); // Redirect user to LiveTickerPage
		return null;
	}

	const signIn = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			console.log(result);
		} catch (error) {
			setError(error.message); // Set error message in case of failure
		}
	};

	return (
		<div className="text-center flex flex-col gap-4 items-container">
			<div> Please sign in to continue </div>
			{error && <div className="text-red-500">{error}</div>}{" "}
			{/* Display error message if exists */}
			<button onClick={signIn}>
				<div className="flex items-center gap-2">Sign In</div>
			</button>
		</div>
	);
}
