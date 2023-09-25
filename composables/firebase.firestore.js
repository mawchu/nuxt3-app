
import { getFirestore, collection, addDoc, doc, setDoc, query, where, getDocs, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { userCenterStore } from '~/stores/userCenter';
import Cookies from 'js-cookie';

export async function createUserDocument ($db, user) {
  // await getUserDatas ($db);
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
  const user = await getUserDatas ($db);
  try {
    const usersCollectionRef = collection($db,  'users');
    const userQuery = query(usersCollectionRef, where('uid', '==', userId));
    const userSnapshot = await getDocs(userQuery);
    return userSnapshot.docs[0].ref;
  } catch(error) {
    console.error(`queryTargetUserDocument error:`, queryTargetUserDocument);
  }
}

export async function createUserSpendingRecord ($db, userId, spendingRecordData) {
  // const user = await getUserDatas ($db);
  try {
    const userDocRef = await queryTargetUserDocument ($db, userId);
    const subcollectionRef = collection(userDocRef, 'spendingRecords');
    // Add a document to the subcollection
    await addDoc(subcollectionRef, spendingRecordData);
  } catch(error) {
    console.error(`createUserSpendingRecord error:`, error);
  }
}

export async function createUserBankingList ($db, userId, bankingData) {
  // const user = await getUserDatas ($db);
  try {
    const userDocRef = await queryTargetUserDocument ($db, userId);
    const subcollectionRef = collection(userDocRef, 'bankingList');
    // Add a document to the subcollection
    await addDoc(subcollectionRef, bankingData);
  } catch(error) {
    console.error(`createUserBankingList error:`, error);
  }
}

export async function loadUserBankingList ($db, userId) {
  // const user = await getUserDatas ($db);
  try {
    const { setBankingList } = userCenterStore ();
    const userDocRef = await queryTargetUserDocument ($db, userId);
    const subcollectionRef = collection(userDocRef, 'bankingList');
      // Query documents in the subcollection
    const querySnapshot = await getDocs(subcollectionRef);

    const list = [];
    querySnapshot.forEach((doc) => {
      // console.log("Document ID:", doc.id);
      // console.log("Document data:", doc.data());
      list.push(
        {
          id: doc.id,
          ...doc.data()
        }
      )
    });
    await setBankingList(list.flat(1));
    // console.log('userCenterStore', userCenterStore)
  } catch(error) {
    console.error('loadUserBankingList error:', error);
  }
}

export async function loadUserSpendingRecord ($db, userId) {
  // const user = await getUserDatas ($db);
  try {
    const { setSpendingRecords } = userCenterStore ();
    const userDocRef = await queryTargetUserDocument ($db, userId);
    const subcollectionRef = collection(userDocRef, 'spendingRecords');
      // Query documents in the subcollection
    const querySnapshot = await getDocs(subcollectionRef);

    const list = [];
    querySnapshot.forEach((doc) => {
      // console.log("Document ID:", doc.id);
      // console.log("Document data:", doc.data());
      list.push(
        {
          id: doc.id,
          ...doc.data()
        }
      )
    });
    await setSpendingRecords(list.flat(1));
    // console.log('userCenterStore', userCenterStore)
  } catch(error) {
    console.error('loadUserSpendingRecord error:', error);
  }
}

export async function deleteUserSpendingRecord ($db, userId, deleteId) {
  // const user = await getUserDatas ($db);
  try {
    const { setSpendingRecords } = userCenterStore ();
    const userDocRef = await queryTargetUserDocument ($db, userId);
    const subcollectionRef = collection(userDocRef, 'spendingRecords');
    const documentRef = doc(subcollectionRef, deleteId);
    await deleteDoc(documentRef);
    const querySnapshot = await getDocs(subcollectionRef);

    const list = [];
    querySnapshot.forEach((doc) => {
      // console.log("Document ID:", doc.id);
      // console.log("Document data:", doc.data());
      list.push(
        {
          id: doc.id,
          ...doc.data()
        }
      )
    });
    await setSpendingRecords(list.flat(1));
  // console.log('userCenterStore', userCenterStore)
    console.log('Spending record delete successfully.');
  } catch (error) {
    console.error('deleteUserSpendingRecord error:', error);
  }
  
}


export async function deleteUserBankingList ($db, userId, deleteId) {
  // const user = await getUserDatas ($db);
  try {
    const { setBankingList } = userCenterStore ();
    const userDocRef = await queryTargetUserDocument ($db, userId);
    const subcollectionRef = collection(userDocRef, 'bankingList');
    const documentRef = doc(subcollectionRef, deleteId);
    await deleteDoc(documentRef);
    const querySnapshot = await getDocs(subcollectionRef);

    const list = [];
    querySnapshot.forEach((doc) => {
      // console.log("Document ID:", doc.id);
      // console.log("Document data:", doc.data());
      list.push(
        {
          id: doc.id,
          ...doc.data()
        }
      )
    });
    await setBankingList(list.flat(1));
  // console.log('userCenterStore', userCenterStore)
    console.log('Banking item delete successfully.');
  } catch (error) {
    console.error('deleteUserBankingList error:', error);
  }
  
}

export async function editUserSpendingRecord ($db, userId, editId, newData) {
  // const user = await getUserDatas ($db);
  console.log('newData', newData)
  try {
    const { setSpendingRecords } = userCenterStore ();
    const userDocRef = await queryTargetUserDocument ($db, userId);
    const subcollectionRef = collection(userDocRef, 'spendingRecords');
    const documentRef = doc(subcollectionRef, editId);
    await updateDoc(documentRef, newData);
    const querySnapshot = await getDocs(subcollectionRef);

    const list = [];
    querySnapshot.forEach((doc) => {
      // console.log("Document ID:", doc.id);
      // console.log("Document data:", doc.data());
      list.push(
        {
          id: doc.id,
          ...doc.data()
        }
      )
    });
    await setSpendingRecords(list.flat(1));
    await console.log('list',list )
  } catch (error) {
    console.error('editUserSpendingRecord error:', error);
  }
}

export async function editUserBankingList ($db, userId, editId, newData) {
  // const user = await getUserDatas ($db);
  console.log('newData', newData)
  try {
    const { setBankingList } = userCenterStore ();
    const userDocRef = await queryTargetUserDocument ($db, userId);
    const subcollectionRef = collection(userDocRef, 'bankingList');
    const documentRef = doc(subcollectionRef, editId);
    await updateDoc(documentRef, newData);
    const querySnapshot = await getDocs(subcollectionRef);

    const list = [];
    querySnapshot.forEach((doc) => {
      // console.log("Document ID:", doc.id);
      // console.log("Document data:", doc.data());
      list.push(
        {
          id: doc.id,
          ...doc.data()
        }
      )
    });
    await setBankingList(list.flat(1));
    await console.log('list',list )
  } catch (error) {
    console.error('editUserBankingList error:', error);
  }
  
}

export async function getAuthDataByUid(uid) {
  const user = await getUserDatas ($db);
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
    console.error("getAuthDataByUid error:", error);
  }
}