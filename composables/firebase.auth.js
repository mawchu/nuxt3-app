import {
    getAuth,
    signOut
} from "firebase/auth";

export function signOut () {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            // User signed out
            console.log("User signed out");
        })
        .catch((error) => {
            // Error occurred
            console.log(error);
        });
}