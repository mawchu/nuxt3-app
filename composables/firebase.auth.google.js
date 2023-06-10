import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";


export async function signInByGoogle () {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/admin.directory.device.mobile.readonly');

    const auth = getAuth();
    auth.languageCode = 'it';

    const credentials = await signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            console.log('result')
            return result;
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