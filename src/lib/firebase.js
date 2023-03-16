// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  query,
  onSnapshot,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

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
      items.push(doc.data());
    });

    resolve(items);
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

export { db };
