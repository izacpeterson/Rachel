import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, setDoc, getDocs, query, onSnapshot, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { writable } from "svelte/store";

const firebaseConfig = {
  apiKey: "AIzaSyD8HgnXCdZ0bDRbJ4l_8DIrRkvREre5--c",
  authDomain: "rachel-ca3c0.firebaseapp.com",
  projectId: "rachel-ca3c0",
  storageBucket: "rachel-ca3c0.appspot.com",
  messagingSenderId: "987279794418",
  appId: "1:987279794418:web:d009a22c09dd901a8eb06b",
  storageBucket: "gs://rachel-ca3c0.appspot.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export const currentUser = writable(null);

export async function addListItem(list, item) {
  await setDoc(doc(db, "lists", list), {
    item: item,
    uuid: crypto.randomUUID(),
    status: "new",
  });

  const docRef = await addDoc(collection(db, list), {
    item: item,
    uuid: crypto.randomUUID(),
    status: "new",
  });
}

export async function getListItems(list) {
  return new Promise(async (resolve, reject) => {
    const querySnapshot = await getDocs(collection(db, list));
    let items = [];

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      items.push(data);
    });

    resolve(items);
  });
}

export async function updateItemStatus(list, item) {
  return new Promise(async (resolve, reject) => {
    console.log("UPDATE: ", list, item);
    let newStatus;

    if (item.status == "new") {
      newStatus = "done";
    } else {
      newStatus = "new";
    }
    console.log(item);
    const docRef = doc(db, list, item.id);

    await updateDoc(docRef, { status: newStatus });
    resolve(newStatus);
  });
}

export async function uploadPicture(files) {
  return new Promise((resolve, reject) => {
    let numUploaded = 0;

    for (let i = 0; i < files.length; i++) {
      let type = files[i].type;
      console.log(type.split("/"));
      let fileName = crypto.randomUUID() + "." + type.split("/")[1];
      console.log(fileName);
      const fileRef = ref(storage, fileName);

      uploadBytes(fileRef, files[i]).then((snapshot) => {
        numUploaded += 1;
        console.log(numUploaded, files.length);
        if (numUploaded == files.length) {
          resolve("done");
        }
      });
    }
  });
}

export async function getAllFiles() {
  return new Promise((resolve, reject) => {
    let urls = [];
    const listRef = ref(storage, "");
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          getDownloadURL(itemRef).then((url) => {
            urls.push(url);
            if (urls.length === res.items.length) {
              resolve(urls);
            }
          });
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  });
}

export async function login(email, password) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("logged in");

        resolve(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        reject(errorMessage);
      });
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    currentUser.set(user);
    console.log("user logged in");
    // ...
  } else {
    // User is signed out
    // ...
  }
});

export async function logout() {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        console.log("logged out");
        currentUser.set(null);
        resolve("done");
      })
      .catch((error) => {
        reject(error);
      });
  });
}
