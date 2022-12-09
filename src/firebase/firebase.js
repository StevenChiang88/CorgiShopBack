// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiikDX-V5_Il2ukO1NilQc0E_MOlam--w",
  authDomain: "corgishop-6fecc.firebaseapp.com",
  projectId: "corgishop-6fecc",
  storageBucket: "corgishop-6fecc.appspot.com",
  messagingSenderId: "1095267299809",
  appId: "1:1095267299809:web:991dcbab7fe2bc9e07e2a0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const fireBaseFn = (file, data, addOrEditHandler) => {
  const storage = getStorage(app);
  const firebaseFileName = Date.now() + file.name;
  const storageRef = ref(storage, firebaseFileName);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("檔案放在這個網址", downloadURL);
        const data2 = { ...data, img: downloadURL };
        addOrEditHandler(data2);
      });
    }
  );
};
