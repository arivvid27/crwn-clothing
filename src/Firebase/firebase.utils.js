import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC72ui6ksT2k69qtxdh65U8N8s3P_xoheA",
    authDomain: "crwn-db-c3a1b.firebaseapp.com",
    projectId: "crwn-db-c3a1b",
    storageBucket: "crwn-db-c3a1b.appspot.com",
    messagingSenderId: "174428156825",
    appId: "1:174428156825:web:d9a0cf92f431ce99325908",
    measurementId: "G-G959MYCZZK"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
