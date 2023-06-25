import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

import { createUserDocument } from "./firebase.firestore";

import { getUserDatas } from "./firebase.auth.email";


export async function signInByGoogle () {
    console.log(124)
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/admin.directory.device.mobile.readonly');

    const auth = getAuth();
    auth.languageCode = 'it';

    const credentials = await signInWithPopup(auth, provider)
        .then(async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;

            // IdP data available using getAdditionalUserInfo(result)
            // ...
            await getUserDatas();
            await createUserDocument($db, user);

            return user;
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.error(errorCode)
        });
    return credentials;

}