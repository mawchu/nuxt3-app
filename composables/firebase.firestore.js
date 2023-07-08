
import { getFirestore, collection, addDoc, doc, setDoc, query, where, getDocs, getDoc } from "firebase/firestore";
import { userCenterStore } from '~/stores/userCenter';
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

async function queryTargetUserDocument ($db, userId) {
  console.log('$db, userId', $db, userId)
  const usersCollectionRef = collection($db,  'users');
  const userQuery = query(usersCollectionRef, where('uid', '==', userId));
  console.log(userQuery)
  const userSnapshot = await getDocs(userQuery);
  return userSnapshot.docs[0].ref;
}

export async function createUserSpendingRecord ($db, userId, spendingRecordData) {
  const userDocRef = await queryTargetUserDocument ($db, userId);
  const subcollectionRef = collection(userDocRef, 'spendingRecords');
  // Add a document to the subcollection
  await addDoc(subcollectionRef, spendingRecordData);


  // await console.log($db, userId, spendingRecordData)
  // // Get the reference to the user document
  // const docUserRef = doc($db, 'users', userId);

  // // Add a new spending record document under the spendingRecords subcollection
  // const collectionSpendingRecordsRef = collection(docUserRef, 'spendingRecords');

  // const newSpendingRecordRef = await addDoc(collectionSpendingRecordsRef, spendingRecordData);
  // const newSpendingRecordId = newSpendingRecordRef.id;

  // console.log('New spending record ID:', newSpendingRecordId);
}

export async function loadUserSpendingRecord ($db, userId) {
  const { setSpendingRecords } = userCenterStore ();
  const userDocRef = await queryTargetUserDocument ($db, userId);
  const subcollectionRef = collection(userDocRef, 'spendingRecords');
    // Query documents in the subcollection
  const querySnapshot = await getDocs(subcollectionRef);

  const list = [];
  querySnapshot.forEach((doc) => {
    console.log("Document ID:", doc.id);
    console.log("Document data:", doc.data());
    list.push(
      {
        id: doc.id,
        ...doc.data()
      }
    )
  });
  await setSpendingRecords(list.flat(1));
  // console.log('userCenterStore', userCenterStore)
}

export async function getAuthDataByUid(uid) {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const authData = userDoc.data().authData;
      // Use the authData as needed
      console.log("使用者資料:", authData);
    } else {
      console.log('查無此人');
    }
  } catch (error) {
    console.error("Error retrieving user authentication data:", error);
  }
}