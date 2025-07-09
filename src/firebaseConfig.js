import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCvfoiSybe8t501LbF8AoD8DwCNBNdnbmY",
    authDomain: "first-testing-9fede.firebaseapp.com",
    projectId: "first-testing-9fede",
    storageBucket: "first-testing-9fede.appspot.com",
    messagingSenderId: "142129088408",
    appId: "1:142129088408:web:499072fc62a4cbd5eb8ded"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if
//           request.time < timestamp.date(2023, 4, 7);
//     }
//   }
// }


// match /users/{userId}/{document=**} {
//   allow read, write: if request.auth != null && request.auth.uid == userId;
// }

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if request.auth != null;  // works only after logging
//     } 
//   }
// }

// service cloud.firestore {
//   match /databases/{database}/documents {
//    match /{document=**} {
//      allow read: if true;
//      allow write: if false;
//     }
//  }
// }