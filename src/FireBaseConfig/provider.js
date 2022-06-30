import {
	GoogleAuthProvider,
	signInWithPopup,
	GithubAuthProvider,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
} from "firebase/auth";

import { FirebaseAuth } from "./FireBase";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(FirebaseAuth, googleProvider);
		const { displayName, email, photoUrl, uid } = result.user;

		return {

			ok: true,
			displayName,
			email,
			photoUrl,
			uid,
		};
	} catch (error) {
		const errorCode = error.errorCode;
		const errorMessage = error.message;

		return {
			ok: false,
			errorMessage,
			errorCode,
		};
	}
};

export const signInWithGithub = async () => {
	try {
	} catch (error) {
		const errorCode = error.errorCode;
		const errorMessage = error.message;

		return {
			ok: false,
			errorMessage,
			errorCode,
		};
	}
};

export const registerUserWithEmailAndPasword = async ({
	email,
	password,
	displayName,
}) => {
	try {
		const resp = await createUserWithEmailAndPassword(
			FirebaseAuth,
			email,
			password
		);
		const { uid, photoUrl } = resp.user;

		console.log(resp, "response");

		await updateProfile(FirebaseAuth.currentUser, { displayName });

		return {
			ok: true,
			uid,
			photoUrl,
			email,
			displayName,
		};
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	}
};

export const startLoginWithEmailAndPassword = async ({ email, password }) => {
	try {

		const resp = await signInWithEmailAndPassword(
			FirebaseAuth,
			email,
			password
		);

		const { uid, photoUrl, displayName } = resp.user;

		return {
			ok: true,
			uid, photoUrl, displayName,
		};

	} catch (error) {

		return { ok: false, errorMessage: error.message };

	}
};

export const logoutFireBase = async () => {
	return await FirebaseAuth.signOut();
}