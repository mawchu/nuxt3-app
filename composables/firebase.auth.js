import {
    getAuth,
    createUserWithEmailAndPassword, // 註冊
    signInWithEmailAndPassword, //登入
    onAuthStateChanged // 讀取身份信息
} from "firebase/auth";


export async function register (email, password) {
    const auth = getAuth();
    const credentials = await createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
            // Signed in 
            await login(email, password);
            return userCredential;
            // ...
        })
        .catch(async(error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(
                error.response
            )
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
    console.log(123)
    const auth = getAuth();
    const credentials = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            console.log('登入成功！')
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

export async function getUserDatas () {
    const auth = getAuth();
    // 偵測攔截器
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log('uid', user)
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
}