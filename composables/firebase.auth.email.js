import {
    getAuth,
    createUserWithEmailAndPassword, // 註冊
    signInWithEmailAndPassword, //登入
    onAuthStateChanged // 讀取身份信息
} from "firebase/auth";

import { createUserDocument } from "./firebase.firestore";

import { pinia } from '~/stores/userAuth.js'
import { userAuthStore } from '~/stores/userAuth.js'


// const userAuth = userAuthStore(pinia);
// const { setCurrentComponent } = userAuth;


export async function register ($db, email, password) {
    const auth = getAuth();
    const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    )
        .then(async(userCredential) => {
            // Signed in 
            const { user } = userCredential;
            await login(email, password);
            await createUserDocument($db, user);
            return userCredential;
            // ...
        })
        .catch(async(error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/email-already-in-use') {
                console.log('註冊過了！登入中...')
                const userCredential = await login(email, password);
                return userCredential;
            } else {
                throw error;
            }
            // ..
        });
    return credentials;
}

export async function login (email, password) {
    const auth = getAuth();
    const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
    )
        .then(async (userCredential) => {
            // Signed in 
            console.log('登入成功！')
            await getUserDatas(); 
            return userCredential;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(error)
        });
    
    return credentials;
}

export async function getUserDatas ($db) {
    const auth = getAuth();
    const { isLoggedIn, userData, login, logout } = userAuthStore();

    // 偵測攔截器
    await onAuthStateChanged(auth, async (user) => {
        if (user) {
            const { uid } = user;
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User

            console.log('uid', user, 'is sign in');
            login(user);
            // setCurrentComponent('home');
            return user
        } else {
            // User is signed out
            console.log('uid', user, 'is sign out');
            logout();
        }

        return {
            isLoggedIn,
            userData
        }

    });

}