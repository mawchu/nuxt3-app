
import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore";

export async function createUserDocument ($db, user) {
    
    try {
      const usersCollection = collection($db, "users");
      
      const userData = {
        uid: user.uid,
        name: user.displayName,
        email: user.email
      };

      await addDoc(usersCollection, userData);
  
    } catch (error) {
      console.error("Error creating user document in Firestore:", error);
    }
};
