import { auth } from "./firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, updatePassword, signInWithEmailAndPassword } from "firebase/auth";

export function doCreateUserWithEmailAndPassword(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
};

export function doSignInWithEmailAndPassword(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    result.user

    return result
};

export const doSignOut = () => {
    return auth.signOut();
};


export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth,email);
};

export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
};

