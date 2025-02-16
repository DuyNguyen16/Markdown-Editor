import firebase from "firebase/compat/app";

export interface DocumentData {
    id: string;
    title: string;
    text: string; // Ensure this matches your Firestore field
    date: firebase.firestore.Timestamp;
}